import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { response, Response } from 'express';
import { GptService } from 'src/gpt/gpt.service';
import { FiresService } from 'src/firms/fires.service';
import { WeatherService } from 'src/weather/weather.service';
import { ZonasVerdesService } from 'src/zonas-verdes/zonas-verdes.service';
import { WeatherRequestDto } from 'src/weather/dto/weather-request.dto';
import { ICoordenadas } from 'src/zonas-verdes/interfaces/coordenadas.interface';
import { LocationDto } from 'src/gpt/dtos/location.dto';

@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly gptService: GptService,
    private readonly fireService: FiresService,
    private readonly weatherService: WeatherService,
    private readonly zonasVerdes: ZonasVerdesService
  
  
  ) {}
  @Post()
  async prueba(@Body() locationDto: LocationDto, @Res() res: Response) {
    const { latitud, longitud } = locationDto;
  
    const weatherRequest = new WeatherRequestDto();
    weatherRequest.lat = latitud;
    weatherRequest.lon = longitud;
  
    const zonaVerdeRequest: ICoordenadas = { longitud, latitud };
  
    const [weatherData, firesData, zonasVerdesData] = await Promise.all([
      this.weatherService.getWeather(weatherRequest),
      this.fireService.getClosestFire(latitud, longitud),
      this.zonasVerdes.findByCoordinates(zonaVerdeRequest)
    ]);
  
    const data = await this.gptService.reportPDF(weatherData, firesData, zonasVerdesData);
    const pdf = await this.reportsService.reportPDF(data);
  
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=report.pdf'
    });
  
    pdf.pipe(res);
    pdf.end();
  }

}
