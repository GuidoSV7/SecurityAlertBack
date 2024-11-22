import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, IsArray, IsDateString, IsNumber, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';


class ValidityDto {
  @ApiProperty({ example: '2024-03-21T10:00:00Z' })
  @IsDateString()
  fechaInicio: Date;

  @ApiProperty({ example: '2024-03-22T10:00:00Z' })
  @IsDateString()
  fechaFin: Date;
}

class CoordinatesDto {
  @ApiProperty({ example: -17.783330 })
  @IsNumber()
  latitude: number;

  @ApiProperty({ example: -63.182126 })
  @IsNumber()
  longitude: number;

  @ApiProperty({ example: 1000, description: 'Radio in meters' })
  @IsNumber()
  radio: number;
}

class EmergencyContactDto {
  @ApiProperty({ example: 'Bomberos' })
  @IsString()
  institucion: string;

  @ApiProperty({ example: '123-456789' })
  @IsString()
  telefono: string;

  @ApiProperty({ example: 'Av. Principal #123' })
  @IsString()
  direccion: string;
}

export class CreateAlertDto {
  @ApiProperty()
  @IsString()
  nivelAlerta: string;

  @ApiProperty()
  @IsString()
  tipoEvento: string;

  @ApiProperty({ example: 'Posible inundación en zona norte' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: ['Zona Norte', 'Distrito 1'] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  zonasAfectadas: string[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => ValidityDto)
  vigencia: ValidityDto;

  @ApiProperty({ example: ['Evitar zonas bajas', 'Asegurar pertenencias'] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  recomendaciones: string[];

  @ApiProperty({ example: 'Defensa Civil' })
  @IsString()
  institucionEmisora: string;

  @ApiProperty()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  coordenadas: CoordinatesDto;

  @ApiProperty({ type: [EmergencyContactDto] })
  @ValidateNested({ each: true })
  @Type(() => EmergencyContactDto)
  @ArrayMinSize(1)
  contactosEmergencia: EmergencyContactDto[];
}