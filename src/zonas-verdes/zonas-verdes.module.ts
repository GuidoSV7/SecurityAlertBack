import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonasVerdesService } from './zonas-verdes.service';
import { ZonaVerde } from './entities/zona-verde.entity';
import { ZonasVerdesTestController } from './zonas-verdes.test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ZonaVerde])],
  providers: [ZonasVerdesService],
  controllers: [ZonasVerdesTestController], 
  exports: [ZonasVerdesService], 
})
export class ZonasVerdesModule {}