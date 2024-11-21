import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { GptModule } from 'src/gpt/gpt.module';
import { ZonasVerdesModule } from 'src/zonas-verdes/zonas-verdes.module';
import { WeatherModule } from 'src/weather/weather.module';
import { FiresModule } from 'src/firms/fires.module';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports:[GptModule,FiresModule,WeatherModule, ZonasVerdesModule]
  
})
export class ReportsModule {}
