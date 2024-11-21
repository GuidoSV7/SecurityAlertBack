import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZonasVerdesService } from './zonas-verdes.service';
import { ZonaVerde } from './entities/zona-verde.entity';
import { ZonasVerdesTestController } from './zonas-verdes.test.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ZonaVerde])],
  providers: [ZonasVerdesService],
  controllers: [ZonasVerdesTestController], 
  exports: [ZonasVerdesService], // Exportamos el servicio para que pueda ser usado en otros módulos
})
export class ZonasVerdesModule {}