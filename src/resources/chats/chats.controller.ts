import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Request, Response } from 'express';
import { IMessage } from './chats.dto';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chat: ChatsService) {}
  @Post('/message')
  async handleSendMessage(@Req() req: Request, @Res() res: Response, @Body() payload: IMessage) {
    const response = await this.chat.handleSaveMessage(payload);
    return res.json({ send: true })
  }
}
