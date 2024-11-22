import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumber, IsArray, IsDate, IsNotEmpty, ValidateNested, IsLatitude, IsLongitude, ArrayMinSize, IsPositive } from 'class-validator';

export class ValidityDto {
  @ApiProperty({ example: '2024-03-21T10:00:00Z' })
  @IsDate()
 
  @Type(() => Date)
  fechaInicio: Date;

  @ApiProperty({ example: '2024-03-22T10:00:00Z' })
  @IsDate()
 
  @Type(() => Date)
  fechaFin: Date;
}

export class CoordinatesDto {
  @ApiProperty({ example: -17.783330 })
  @IsNumber()
  @IsLatitude()
 
  latitude: number;

  @ApiProperty({ example: -63.182126 })
  @IsNumber()
  @IsLongitude()
 
  longitude: number;

  @ApiProperty({ example: 1000, description: 'Radio in meters' })
  @IsNumber()
  @IsPositive()
 
  radio: number;
}

export class EmergencyContactDto {
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
  @ApiProperty({ example: 'VERDE', enum: ['VERDE', 'AMARILLO', 'NARANJA', 'ROJO'] })
  @IsString()
 
  nivelAlerta: string;

  @ApiProperty({ example: 'INUNDACION' })
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
  @IsArray()
  @ArrayMinSize(1)
 
  contactosEmergencia: EmergencyContactDto[];
}