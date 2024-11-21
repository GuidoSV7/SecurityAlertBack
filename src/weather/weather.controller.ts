import { Controller, Post, Body } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { WeatherRequestDto } from './dto/weather-request.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';

@ApiTags('Clima')
@Controller('clima')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  @ApiOperation({ summary: 'Obtener datos del clima por coordenadas' })
  @ApiBody({ type: WeatherRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Datos del clima obtenidos exitosamente',
    type: WeatherResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos',
  })
  @ApiResponse({
    status: 504,
    description: 'Timeout en la conexión con el servicio meteorológico',
  })
  async getWeather(@Body() weatherRequest: WeatherRequestDto): Promise<WeatherResponseDto> {
    return await this.weatherService.getWeather(weatherRequest);
  }
}