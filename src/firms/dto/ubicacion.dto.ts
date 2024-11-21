import { IsNumber, IsOptional, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
export class UbicacionDto {
    @IsNumber()
    @Type(() => Number)
    @Min(-90)
    @Max(90)
    latitud: number;
  
    @IsNumber()
    @Type(() => Number)
    @Min(-180)
    @Max(180)
    longitud: number;
  }