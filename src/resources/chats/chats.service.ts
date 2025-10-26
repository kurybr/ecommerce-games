import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { OpenIAService } from 'src/services/openia.service';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ChatsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly openai: OpenIAService
    ) {}
    async getHistoric(chatId: string) {
        const chat_messages = await this.prisma.message.findMany({
            where: { chatId },
            orderBy: { createdAt: 'desc' }
        })
        return chat_messages;
    }

    async handleSaveMessage(message: Prisma.MessageCreateInput) {

        if(!message.chatId) {

            /** Salvamos no inicio da conversa o prompt do nosso agente. */
            const { chatId } = await this.prisma.message.create({
                data: {
                    content: 'Você é o atendente da loja e deve dar informações sobre a loja',
                    role: 'system'
                }
            })

            message.chatId = chatId;

        }

        // Salvamos a mensagem do usuário
        await this.prisma.message.create({ data: message })

        const messages = await this.getHistoric(message.chatId);

        const agente_response = await this.openai.client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                ...messages
            ]
        })

        const text = agente_response.choices[0].message.content || "";

        const assistant_message: Prisma.MessageCreateInput = {
            chatId: message.chatId,
            content: text,
            role: 'assistant'
        }

        await this.prisma.message.create({ data: assistant_message })

        return {
            chatId: message.chatId,
            content: text
        };
    }
}
