import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, Role } from 'prisma/generated';
import { OpenIAService } from 'src/services/openia.service';
import { PrismaService } from 'src/services/prisma.service';
import fs from 'fs';
import path from 'path';
import { WhatsappService } from 'src/services/whatsapp.service';
import Whatsapp from 'whatsapp-web.js';
import { ChatCompletionMessageParam, ChatCompletionTool } from 'openai/resources/index';
import { ChatAssistantTools } from './chats.tools';

@Injectable()
export class ChatsService implements OnModuleInit {
  model: string = 'gpt-4o-mini';
  prompt: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly openai: OpenIAService,
    private readonly wpp: WhatsappService,
    private readonly chatTools: ChatAssistantTools
  ) {
    this.wpp.handleSubscribeEvent('message', this.handleWhatsappMessages.bind(this));
  }

  onModuleInit() {
    const prompt = fs.readFileSync(
      path.join(process.cwd(), 'src/prompts/chat.prompt.md'),
      'utf8',
    );

    this.prompt = prompt;
    this.chatTools.registerTools();

  }

  async getHistoric(chatId: string) {
    const chat_messages = await this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'desc' },
    });
    return chat_messages;
  }

  async handleSaveMessage(message: Prisma.MessageCreateInput) {

    let messages = await this.getHistoric(message.chatId as string);

    if (!messages.some(msg => msg.role === 'system')) {

      /** Salvamos no inicio da conversa o prompt do nosso agente. */
      const { chatId } = await this.prisma.message.create({
        data: {
          content: this.prompt,
          role: 'system',
        },
      });

      message.chatId = chatId;
    }

    // Salvamos a mensagem do usuário
    await this.prisma.message.create({ data: message });

    messages = await this.getHistoric(message.chatId as string);

    const tools: ChatCompletionTool[] = Array.from(this.chatTools.tools.values()).map(tool => ({
			type: 'function',
			function: {
				name: tool.name,
				description: tool.description,
				parameters: tool.parameters
			}
		}));

    const prepareMessage = (messages) => {
      return  messages.map((msg) => {

        console.log({
          msg
        })

        const data = {
            role: msg.role,
            content: msg.content,
            ...(msg.tool_calls && { tool_calls: JSON.parse(msg.tool_calls) as [] }),
            ...(msg.tool_call_id && { tool_call_id: msg.tool_call_id })
        } as ChatCompletionMessageParam
        console.log(data);
        return data;
      })
    }

    let agente_response = await this.openai.client.chat.completions.create({
      model: this.model,
      temperature: 0.7,
      messages: prepareMessage(messages),
      tools,
      tool_choice: 'auto'
    });


    console.log(agente_response.choices);

    /**
     * Vamos chamar uma tool.
     */
    if(agente_response.choices[0].message.tool_calls && agente_response.choices[0].message.tool_calls.length) {

      const { tool_calls } = agente_response.choices[0].message;

      for await (const tool of tool_calls) {

          if (tool.type !== 'function' || !tool.function) { continue; }

          const { name, arguments: toolArgs } = tool.function;

          const actual_tool = this.chatTools.tools.get(name);

          if(!actual_tool) {

            const result: Prisma.MessageCreateInput = {
                role: 'tool',
                tool_call_id: tool.id,
                content: JSON.stringify({  error: 'Ferramenta não encontrada', tool_name: name}),
            }

            const tool_message = await this.prisma.message.create({
                data: {...result},
            });

            messages.push(tool_message);
            continue;
          }


          const data = await actual_tool.handler(toolArgs, { chatId: message.chatId })

          console.log(tool);

          const result: Prisma.MessageCreateInput = {
              role: 'tool',
              tool_call_id: tool.id,
              content: JSON.stringify(data),
          }

          console.log('\n\n\n\n\n\n\n\n\n')
          console.log({result});

          const tool_message = await this.prisma.message.create({
              data: {...result},
          });

          messages.push(tool_message);

      }

    }

    console.log('\n\n\n\n\n\n\n\n\n')
    console.log({
      messages: prepareMessage(messages)
    });


    agente_response = await this.openai.client.chat.completions.create({
      model: this.model,
      temperature: 0.7,
      messages: prepareMessage(messages),
      tools
    });

    const text = agente_response.choices[0].message.content || '';

    const assistant_message: Prisma.MessageCreateInput = {
      chatId: message.chatId,
      content: text,
      role: 'assistant',
    };

    await this.prisma.message.create({ data: assistant_message });

    return {
      chatId: message.chatId,
      content: text,
    };
  }


  async handleWhatsappMessages(msg: Whatsapp.Message) {

    if(!msg.id.remote.includes('5518981482812@c.us')) return;

     /** Salvamos no inicio da conversa o prompt do nosso agente. */
    const response = await this.handleSaveMessage( {
        chatId: msg.id.remote,
        content: msg.body
    })

    msg.reply(response.content)

  }



}
