import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Enums
export enum AlertLevel {
  VERDE = 'VERDE (monitoreo)',
  AMARILLA = 'AMARILLA (precaución)',
  NARANJA = 'NARANJA (peligro)',
  ROJA = 'ROJA (emergencia)',

}

export enum EventType {
  INUNDACION = 'INUNDACION',
  VIENTOS_FUERTES = 'VIENTOS_FUERTES',
  LLUVIA_INTENSA = 'LLUVIA_INTENSA',
  DESLIZAMIENTO = 'DESLIZAMIENTO',
  INCENDIO_FORESTAL = 'INCENDIO_FORESTAL',
  SEQUIA = 'SEQUIA',
  TORMENTA_ELECTRICA = 'TORMENTA_ELECTRICA',
  GRANIZADA = 'GRANIZADA',
  ONDA_CALOR = 'ONDA_CALOR'
}

// Embedded classes
class Validity {
  @Column({ type: 'timestamp' })
  fechaInicio: Date;

  @Column({ type: 'timestamp' })
  fechaFin: Date;
}

class Coordinates {
  @Column({ type: 'double precision' })
  latitude: number;

  @Column({ type: 'double precision' })
  longitude: number;

  @Column({ type: 'double precision' })
  radio: number;
}

class EmergencyContact {
  @Column()
  institucion: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;
}

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: AlertLevel,
    default: AlertLevel.VERDE
  })
  nivelAlerta: AlertLevel;

  @Column({
    type: 'enum',
    enum: EventType
  })
  tipoEvento: EventType;

  @Column('text')
  descripcion: string;

  @Column('simple-array')
  zonasAfectadas: string[];

  @Column(() => Validity)
  vigencia: Validity;

  @Column('simple-array')
  recomendaciones: string[];

  @Column()
  institucionEmisora: string;

  @Column(() => Coordinates)
  coordenadas: Coordinates;

  @Column('json')
  contactosEmergencia: EmergencyContact[];

}