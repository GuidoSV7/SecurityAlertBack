import { ApiProperty } from '@nestjs/swagger';

export class WeatherResponseDto {
  @ApiProperty({ example: 23.2, description: 'Temperatura máxima en las últimas 24 horas (°C)' })
  temperatura_max: number;

  @ApiProperty({ example: 20.3, description: 'Temperatura actual (°C)' })
  temperatura_actual: number;

  @ApiProperty({ example: 0, description: 'Precipitación en la última hora (mm)' })
  precipitacion: number;

  @ApiProperty({ example: 88.8, description: 'Humedad relativa (%)' })
  humedad: number;

  @ApiProperty({ example: 2, description: 'Velocidad del viento (m/s)' })
  velocidad_viento: number;

  @ApiProperty({ example: '2024-11-21T01:42:25.596Z', description: 'Fecha y hora de la consulta' })
  fecha_consulta: string;
}