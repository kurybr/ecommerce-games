import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ChatsService {
    constructor(private readonly prisma: PrismaService) {}

    async handleSaveMessage(message: Prisma.MessageCreateInput) {
        const response = await this.prisma.message.create({ data: message })
        return response;
    }
}
