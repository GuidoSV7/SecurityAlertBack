import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Embedded classes
class Validity {
  @Column({ type: 'timestamp', nullable: true })
  fechaInicio: Date;

  @Column({ type: 'timestamp', nullable: true })
  fechaFin: Date;
}

class Coordinates {
  @Column({ type: 'double precision', nullable: true })
  latitude: number;

  @Column({ type: 'double precision', nullable: true })
  longitude: number;

  @Column({ type: 'double precision', nullable: true })
  radio: number;
}

class EmergencyContact {
  @Column({ nullable: true })
  institucion: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  direccion: string;
}

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ 
    default: 'VERDE',
    nullable: true
  })
  nivelAlerta: string;

  @Column({ nullable: true })
  tipoEvento: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column('simple-array', { nullable: true })
  zonasAfectadas: string[];

  @Column(() => Validity)
  vigencia: Validity;

  @Column('simple-array', { nullable: true })
  recomendaciones: string[];

  @Column({ nullable: true })
  institucionEmisora: string;

  @Column(() => Coordinates)
  coordenadas: Coordinates;

  @Column('json', { nullable: true })
  contactosEmergencia: EmergencyContact[];
}