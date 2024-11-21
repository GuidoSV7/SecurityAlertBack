import { Module } from '@nestjs/common';
import { GptService } from './gpt.service';
import { GptController } from './gpt.controller';
import { ZonasVerdesModule } from 'src/zonas-verdes/zonas-verdes.module';
import { FiresModule } from 'src/firms/fires.module';
import { FiresService } from 'src/firms/fires.service';
import { WeatherModule } from 'src/weather/weather.module';

@Module({
  controllers: [GptController],
  providers: [GptService],
  exports:[GptService],
  imports:[FiresModule,WeatherModule, ZonasVerdesModule ]

 

})
export class GptModule {}
