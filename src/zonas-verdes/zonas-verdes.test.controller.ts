import { Controller, Post, Body, Get } from '@nestjs/common';
import { ZonasVerdesService } from './zonas-verdes.service';
import { ICoordenadas } from './interfaces/coordenadas.interface';

@Controller('test/zonas-verdes')
export class ZonasVerdesTestController {
  constructor(private readonly zonasVerdesService: ZonasVerdesService) {}

  @Post('buscar')
  findByCoordinates(@Body() coordenadas: ICoordenadas) {
    return this.zonasVerdesService.findByCoordinates(coordenadas);
  }


}