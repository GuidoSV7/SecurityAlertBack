import { IsNumber, IsLatitude, IsLongitude } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class WeatherRequestDto {
  @ApiProperty({ 
    example: -17.783327, 
    description: 'Latitud de la ubicación',
  })
  @IsNumber()
  @IsLatitude()
  lat: number;

  @ApiProperty({ 
    example: -63.182140, 
    description: 'Longitud de la ubicación',
  })
  @IsNumber()
  @IsLongitude()
  lon: number;
}