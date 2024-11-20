import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<Context>
  ) {}

  async saveMessage(message: any) {
    // Aquí puedes guardar el mensaje en una base de datos
    return message;
  }

  async findAllMessages() {
    // Aquí puedes recuperar todos los mensajes guardados
    return [];
  }
}