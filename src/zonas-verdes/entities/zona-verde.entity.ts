import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('iareforestation')
export class ZonaVerde {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'text', nullable: true })
  fid?: string;

  @Column({ type: 'text', nullable: true })
  area?: string;

  @Column({ type: 'text', nullable: true })
  descripcion?: string;

  @Column({ type: 'text', name: 'rango_altitud', nullable: true })
  rangoAltitud?: string;

  @Column({ type: 'text', name: 'id_c', nullable: true })
  idC?: string;

  @Column({ type: 'text', name: 'shape_length', nullable: true })
  shapeLength?: string;

  @Column({ type: 'text', name: 'shape_area', nullable: true })
  shapeArea?: string;

  @Column({ type: 'text', name: 'fid_fisiog', nullable: true })
  fidFisiog?: string;

  @Column({ type: 'text', nullable: true })
  clase?: string;

  @Column({ type: 'text', name: 'clase_fao', nullable: true })
  claseFao?: string;

  @Column({ type: 'text', nullable: true })
  paisaje?: string;

  @Column({ type: 'text', name: 'desc_paisaje', nullable: true })
  descPaisaje?: string;

  @Column({ type: 'text', name: 'desc_u_mape', nullable: true })
  descUMape?: string;

  @Column({ type: 'text', name: 'sub_paisaje', nullable: true })
  subPaisaje?: string;

  @Column({ type: 'text', name: 'desc_subpaisaje', nullable: true })
  descSubpaisaje?: string;

  @Column({ type: 'text', name: 'gran_paisaje', nullable: true })
  granPaisaje?: string;

  @Column({ type: 'text', name: 'desc_granpaisaje', nullable: true })
  descGranpaisaje?: string;

  @Column({ type: 'text', name: 'desc_provincia', nullable: true })
  descProvincia?: string;

  @Column({ type: 'text', nullable: true })
  sectores?: string;

  @Column({ type: 'text', nullable: true })
  subcat?: string;

  @Column({ type: 'text', nullable: true })
  categoria?: string;

  @Column({ type: 'text', nullable: true })
  perimeter?: string;

  @Column({ type: 'text', name: 'area_1', nullable: true })
  area1?: string;

  @Column({ type: 'text', nullable: true })
  hectareas?: string;

  @Column({ type: 'text', nullable: true })
  etiqueta?: string;

  @Column({ type: 'text', nullable: true })
  departamento?: string;

  @Column({ type: 'text', nullable: true })
  provincia?: string;

  @Column({ type: 'text', nullable: true })
  municipio?: string;

  @Column({ type: 'text', nullable: true })
  capital?: string;

  @Column({ type: 'text', name: 'ley_mun', nullable: true })
  leyMun?: string;

  @Column({ type: 'text', name: 'fecha_ley_mun', nullable: true })
  fechaLeyMun?: string;

  @Column({ type: 'text', nullable: true })
  macroregion?: string;

  @Column({ type: 'text', nullable: true })
  subregion?: string;

  @Column({ type: 'text', name: 'longitud_x', nullable: true })
  longitudX?: string;

  @Column({ type: 'text', name: 'latitud_y', nullable: true })
  latitudY?: string;
}