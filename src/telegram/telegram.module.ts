import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: '7561623751:AAHz0-qjK8bj1STzBPM1vw_TVvY_eiJ4aF8',
    }),
  ],
  providers: [TelegramUpdate, TelegramService],
})
export class TelegramModule {}