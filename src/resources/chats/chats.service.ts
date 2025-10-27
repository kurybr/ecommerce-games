import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { OpenIAService } from 'src/services/openia.service';
import { PrismaService } from 'src/services/prisma.service';
import fs from 'fs';
import path from 'path';
import { WhatsappService } from 'src/services/whatsapp.service';
import Whatsapp from 'whatsapp-web.js';

@Injectable()
export class ChatsService implements OnModuleInit {
  model: string = 'gpt-4o-mini';
  prompt: string;
  constructor(
    private readonly prisma: PrismaService,
    private readonly openai: OpenIAService,
    private readonly wpp: WhatsappService
  ) {
    this.wpp.handleSubscribeEvent('message', this.handleWhatsappMessages.bind(this));
  }

  onModuleInit() {
    const prompt = fs.readFileSync(
      path.join(process.cwd(), 'src/prompts/zero-shot-prompt-framework.md'),
      'utf8',
    );

    this.prompt = prompt;
  }

  async getHistoric(chatId: string) {
    const chat_messages = await this.prisma.message.findMany({
      where: { chatId },
      orderBy: { createdAt: 'desc' },
    });
    return chat_messages;
  }

  async handleSaveMessage(message: Prisma.MessageCreateInput) {

    if (!message.chatId) {
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

    const messages = await this.getHistoric(message.chatId);

    const agente_response = await this.openai.client.chat.completions.create({
      model: this.model,
      temperature: 0.7,
      messages: [...messages],
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

     /** Salvamos no inicio da conversa o prompt do nosso agente. */
    await this.prisma.message.create({
        data: {
          chatId: msg.id.remote,
          content: this.prompt,
          role: 'system',
        },
    });

    const response = await this.handleSaveMessage( {
        chatId: msg.id.remote,
        content: msg.body
    })

    msg.reply(response.content)

  }

}
