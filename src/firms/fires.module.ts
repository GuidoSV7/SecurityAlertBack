import { Module } from '@nestjs/common';
import { FiresService } from './fires.service';
import { FiresController } from './fires.controller';

@Module({
  controllers: [FiresController],
  providers: [FiresService],
  exports:[FiresService]
})
export class FiresModule {}