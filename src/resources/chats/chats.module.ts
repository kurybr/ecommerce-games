import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { ProductsModule } from '../products/products.module';
import { PrismaService } from 'src/services/prisma.service';
import { OpenIAService } from 'src/services/openia.service';
import { WhatsappService } from 'src/services/whatsapp.service';


@Module({
  imports: [ProductsModule],
  controllers: [ChatsController],
  providers: [ChatsService, PrismaService, OpenIAService, WhatsappService],
})
export class ChatsModule {}
