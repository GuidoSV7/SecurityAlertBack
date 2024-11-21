import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { FiresService } from 'src/firms/fires.service';
import { WeatherService } from 'src/weather/weather.service';
import { ZonasVerdesService } from 'src/zonas-verdes/zonas-verdes.service';
import { WeatherRequestDto } from 'src/weather/dto/weather-request.dto';
import { LocationDto } from './dtos/location.dto';
import { ICoordenadas } from './../zonas-verdes/interfaces/coordenadas.interface';


@Controller('gpt')
export class GptController {
  constructor(
    private readonly gptService: GptService,
    private readonly fireService: FiresService,
    private readonly weatherService: WeatherService,
    private readonly zonasVerdes: ZonasVerdesService
  ) {}

  @Post('reportPDF')
  async downloadLocationPdf(@Body() locationDto: LocationDto) {  // Removed @Res()
    const { latitud, longitud } = locationDto;

    // Crear WeatherRequestDto
    const weatherRequest = new WeatherRequestDto();
    weatherRequest.lat = latitud;
    weatherRequest.lon = longitud;

    // Crear ICoordenadas
    const zonaVerdeRequest: ICoordenadas = {
      longitud,
      latitud
    };

    try {
      // Obtener datos de los diferentes servicios
      const [weatherData, firesData, zonasVerdesData] = await Promise.all([
        this.weatherService.getWeather(weatherRequest),
        this.fireService.getClosestFire(latitud, longitud),
        this.zonasVerdes.findByCoordinates(zonaVerdeRequest)
      ]);

      // Obtener el análisis de GPT y retornarlo directamente
      return await this.gptService.reportPDF(weatherData, firesData, zonasVerdesData);
      
    } catch (error) {
      throw new Error(`Error al generar el análisis: ${error.message}`);
    }
  }
}