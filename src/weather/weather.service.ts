import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { WeatherRequestDto } from './dto/weather-request.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';


@Injectable()
export class WeatherService {
  private readonly baseUrl = 'https://api.meteomatics.com';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private getAuthHeader(): string {
    const username = this.configService.get<string>('METEOMATICS_USERNAME');
    const password = this.configService.get<string>('METEOMATICS_PASSWORD');
    
    if (!username || !password) {
      throw new HttpException(
        'Credenciales de API no configuradas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    
    const credentials = Buffer.from(`${username}:${password}`).toString('base64');
    return `Basic ${credentials}`;
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const offset = -4;
    now.setHours(now.getHours() + offset);
    return now.toISOString().replace('.000Z', '.000-04:00');
  }

  async getWeather(weatherRequest: WeatherRequestDto): Promise<WeatherResponseDto> {
    try {
      const { lat, lon } = weatherRequest;
      const datetime = this.getCurrentDateTime();
      const parameters = 't_max_2m_24h:C,t_2m:C,precip_1h:mm,relative_humidity_2m:p,wind_speed_10m:ms';
      const url = `${this.baseUrl}/${datetime}/${parameters}/${lat},${lon}/json`;

      const { data } = await firstValueFrom(
        this.httpService
          .get(url, {
            headers: {
              Authorization: this.getAuthHeader(),
            },
            timeout: 10000,
          })
          .pipe(
            catchError((error: AxiosError) => {
              if (error.code === 'ECONNABORTED') {
                throw new HttpException(
                  'Timeout al conectar con el servicio meteorológico',
                  HttpStatus.GATEWAY_TIMEOUT,
                );
              }
              throw new HttpException(
                `Error en la API de Meteomatics: ${error.message}`,
                HttpStatus.BAD_REQUEST,
              );
            }),
          ),
      );

      if (!data || !data.data || !Array.isArray(data.data)) {
        throw new HttpException(
          'Formato de respuesta inválido del servicio meteorológico',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const response: WeatherResponseDto = {
        temperatura_max: this.extractValue(data.data[0]),
        temperatura_actual: this.extractValue(data.data[1]),
        precipitacion: this.extractValue(data.data[2]),
        humedad: this.extractValue(data.data[3]),
        velocidad_viento: this.extractValue(data.data[4]),
        fecha_consulta: datetime,
      };

      return response;
    } catch (error) {
      console.error('Error en getWeather:', error);
      throw new HttpException(
        error.message || 'Error al obtener datos del clima',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private extractValue(data: any): number {
    try {
      // La estructura correcta es: data.coordinates[0].dates[0].value
      return data?.coordinates[0]?.dates[0]?.value ?? 0;
    } catch (error) {
      console.error('Error extrayendo valor:', error);
      return 0;
    }
  }
}