import { Controller, Post, Req, Res } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Request, Response } from 'express';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chat: ChatsService) {}

  @Post('/message')
  async handleSendMessage(@Req() req: Request, @Res() res: Response) {

    const response = await this.chat.handleSaveMessage(req.body);
    return res.json({ send: true })
  }
}
