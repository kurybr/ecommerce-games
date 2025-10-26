import { Controller, Post, Req, Res } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Request, Response } from 'express';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chat: ChatsService) {}

  @Post('/message')
  handleSendMessage(@Req() req: Request, @Res() res: Response) {

    return res.json({ send: true })
  }
}
