import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.update';
import { TelegramService } from './telegram.service';
import { NotificationfcmModule } from 'src/notificationfcm/notificationfcm.module';


//7561623751:AAHz0-qjK8bj1STzBPM1vw_TVvY_eiJ4aF8
@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: '',
        launchOptions: {
          dropPendingUpdates: true,
          polling: {
            timeout: 30
          }
        }
      })
    }),
    NotificationfcmModule
  ],
  providers: [TelegramUpdate, TelegramService],
})
export class TelegramModule {}