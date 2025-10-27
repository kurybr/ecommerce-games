import { Injectable, OnModuleInit } from '@nestjs/common';
import Whatsapp from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal'

export type WhastappEvent =  'auth_failure' | 'authenticated' | 'change_battery' | 'change_state' | 'disconnected' | 'group_join' | 'group_leave' | 'group_admin_changed' | 'group_membership_request' | 'group_update' | 'contact_changed' | 'media_uploaded' | 'message' | 'message_ack' | 'message_edit' | 'unread_count' | 'message_create' | 'message_ciphertext' | 'message_revoke_everyone' | 'message_revoke_me' | 'message_reaction' | 'chat_removed' | 'chat_archived' | 'loading_screen' | 'qr' | 'code' | 'call' | 'ready' | 'remote_session_saved' | 'vote_update' | string;

@Injectable()
export class WhatsappService implements OnModuleInit {
  client:Whatsapp.Client
  events: Map<WhastappEvent,(...args: any) => void> = new Map();
  constructor() {}
  onModuleInit() {

      this.client = new Whatsapp.Client({
        authStrategy: new Whatsapp.LocalAuth(),
      });

      this.client.on('qr', (qr) => {
          qrcode.generate(qr, {small: true});
      })

      this.client.on('ready', () => {
          console.log('Client is ready');
          this.handleEvents();
      })

      this.client.on('message', msg => {
          if (msg.body == '!ping') {
              msg.reply('pong');
          }
      });

      this.client.initialize();
  }

  handleSubscribeEvent(event: WhastappEvent, callback: (...args: any) => void) {
    this.events.set(event, callback);
  }
  handleEvents() {

    this.events.forEach((callback, event) => {
        this.client.on(event, callback);
    })

  }

}
