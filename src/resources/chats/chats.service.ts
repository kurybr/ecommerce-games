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

        const response = await this.prisma.message.create({ data: message })

        const agente_response = await this.openai.client.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    content: 'Você é o atendente da loja e deve dar informações sobre a loja',
                    role: 'system'
                },
                {
                    role:'user',
                    content: message.message
                }
            ]
        })

        const text = agente_response.choices[0].message.content || "";

        await this.prisma.message.create({
            data: {
                chatId: response.chatId,
                message: text,
                role: 'assistant'
            }
        })

        return text;
    }
}
