import { Module } from '@nestjs/common';
import { NotificationfcmService } from './notificationfcm.service';
import { NotificationfcmController } from './notificationfcm.controller';

@Module({
  controllers: [NotificationfcmController],
  providers: [NotificationfcmService],
})
export class NotificationfcmModule {}
