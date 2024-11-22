import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
    default: 'VERDE'
  })
  nivelAlerta: string;

  @Column()
  tipoEvento: string;

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