import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { NotificationfcmService } from 'src/notificationfcm/notificationfcm.service';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramService {
  constructor(
    @InjectBot() private bot: Telegraf<Context>,

    private readonly  notificationfcmService:  NotificationfcmService
  ) {}


  async onApplicationShutdown(signal?: string) {
    await this.bot.stop(signal);
  }

  async saveMessage(message: any) {
    const tokens = ["dbbZ0QiJTTGJY1V0LwqJIZ:APA91bFEyVMp_puMkZBnRcEdEvqrrPMvBJniOscSu_VksIOCZPy5zzxyE1Gj4H90Z5ZXPGFKR-ZsRhoT1_WpkbQhlT1RV-2J0rB56XiNNhkuMW6KaY1sngQ"];
    
  
    await this.notificationfcmService.sendNotificationToMultipleTokens({
      tokens,
      title: message.text || 'Nueva notificación',
      body: message.caption || message.text || 'Tienes un nuevo mensaje',
      ...(message.photoUrl && { icon: message.photoUrl })
    });

    return message;
}

  async findAllMessages() {
    // Aquí puedes recuperar todos los mensajes guardados
    return [];
  }
}