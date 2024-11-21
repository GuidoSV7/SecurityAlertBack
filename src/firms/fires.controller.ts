import { Controller, Post, Body } from '@nestjs/common';
import { FiresService } from './fires.service';
import { UbicacionDto } from './dto/ubicacion.dto';


@Controller('fires')
export class FiresController {
  constructor(private readonly firesService: FiresService) {}

  @Post('closest')
  async getClosestFire(@Body() ubicacionDto: UbicacionDto) {
    const { latitud, longitud } = ubicacionDto;

    if (isNaN(latitud) || isNaN(longitud)) {
      return { error: 'Latitud y longitud son requeridas y deben ser numéricas.' };
    }

    return await this.firesService.getClosestFire(latitud, longitud);
  }
}