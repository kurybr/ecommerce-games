import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './resources/products/products.module';
import { ChatsModule } from './resources/chats/chats.module';

@Module({
  imports: [ProductsModule, ChatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
