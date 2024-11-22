import { ApiProperty } from '@nestjs/swagger';

class ValidityDto {
  @ApiProperty({ example: '2024-03-21T10:00:00Z' })
  fechaInicio: Date;

  @ApiProperty({ example: '2024-03-22T10:00:00Z' })
  fechaFin: Date;
}

class CoordinatesDto {
  @ApiProperty({ example: -17.783330 })
  latitude: number;

  @ApiProperty({ example: -63.182126 })
  longitude: number;

  @ApiProperty({ example: 1000, description: 'Radio in meters' })
  radio: number;
}

class EmergencyContactDto {
  @ApiProperty({ example: 'Bomberos' })
  institucion: string;

  @ApiProperty({ example: '123-456789' })
  telefono: string;

  @ApiProperty({ example: 'Av. Principal #123' })
  direccion: string;
}

export class CreateAlertDto {
  @ApiProperty({ example: 'VERDE' })
  nivelAlerta: string;

  @ApiProperty({ example: 'INUNDACION' })
  tipoEvento: string;

  @ApiProperty({ example: 'Posible inundación en zona norte' })
  descripcion: string;

  @ApiProperty({ example: ['Zona Norte', 'Distrito 1'] })
  zonasAfectadas: string[];

  @ApiProperty()
  vigencia: ValidityDto;

  @ApiProperty({ example: ['Evitar zonas bajas', 'Asegurar pertenencias'] })
  recomendaciones: string[];

  @ApiProperty({ example: 'Defensa Civil' })
  institucionEmisora: string;

  @ApiProperty()
  coordenadas: CoordinatesDto;

  @ApiProperty({ type: [EmergencyContactDto] })
  contactosEmergencia: EmergencyContactDto[];
}