import { Module } from '@nestjs/common';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';
import { Alert } from './entities/alert.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationfcmModule } from 'src/notificationfcm/notificationfcm.module';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [AlertsController],
  imports:[TypeOrmModule.forFeature([Alert, User]),
  AlertsModule, NotificationfcmModule
],
  providers: [AlertsService],
})
export class AlertsModule {}
