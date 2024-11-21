import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZonaVerde } from './entities/zona-verde.entity';
import { ICoordenadas } from './interfaces/coordenadas.interface';
import { IZonaVerdeResponse } from './interfaces/zona-verde-response.interface';

@Injectable()
export class ZonasVerdesService {
  private readonly logger = new Logger(ZonasVerdesService.name);

  constructor(
    @InjectRepository(ZonaVerde)
    private zonasVerdesRepository: Repository<ZonaVerde>,
  ) {}

  async findByCoordinates(coordenadas: ICoordenadas): Promise<IZonaVerdeResponse> {
    try {
      const radioKm = coordenadas.radioKm || 5;
      const longitud = coordenadas.longitud.toString().replace('.', ',');
      const latitud = coordenadas.latitud.toString().replace('.', ',');

      this.logger.debug(`Buscando coordenada más cercana a: longitud=${longitud}, latitud=${latitud}`);

      // Consulta SQL optimizada para traer solo el resultado más cercano
      const query = this.zonasVerdesRepository
        .createQueryBuilder('zona')
        .select('zona.*')
        .addSelect(
          `(
            6371 * acos(
              cos(radians(CAST(REPLACE(:latitud, ',', '.') AS float))) * 
              cos(radians(CAST(REPLACE(latitud_y, ',', '.') AS float))) * 
              cos(radians(CAST(REPLACE(longitud_x, ',', '.') AS float)) - 
                  radians(CAST(REPLACE(:longitud, ',', '.') AS float))) + 
              sin(radians(CAST(REPLACE(:latitud, ',', '.') AS float))) * 
              sin(radians(CAST(REPLACE(latitud_y, ',', '.') AS float)))
            )
          )`,
          'distancia'
        )
        .where('zona.longitud_x IS NOT NULL')
        .andWhere('zona.latitud_y IS NOT NULL')
        .andWhere(
          `(
            6371 * acos(
              cos(radians(CAST(REPLACE(:latitud, ',', '.') AS float))) * 
              cos(radians(CAST(REPLACE(latitud_y, ',', '.') AS float))) * 
              cos(radians(CAST(REPLACE(longitud_x, ',', '.') AS float)) - 
                  radians(CAST(REPLACE(:longitud, ',', '.') AS float))) + 
              sin(radians(CAST(REPLACE(:latitud, ',', '.') AS float))) * 
              sin(radians(CAST(REPLACE(latitud_y, ',', '.') AS float)))
            )
          ) <= :radio`,
          { longitud, latitud, radio: radioKm }
        )
        .orderBy('distancia', 'ASC')
        .limit(1);

      const zona = await query.getRawOne();

      if (!zona) {
        throw new Error('No se encontró ninguna zona en el radio especificado');
      }

      this.logger.debug(`Zona encontrada a ${Number(zona.distancia).toFixed(2)}km de distancia`);

      return {
        distanciaKm: Number(zona.distancia.toFixed(2)),
        fid: zona.fid || null,
        area: zona.area || null,
        descripcion: zona.descripcion || null,
        rangoAltitud: zona.rango_altitud || null,
        idC: zona.id_c || null,
        shapeLength: zona.shape_length || null,
        shapeArea: zona.shape_area || null,
        fidFisiog: zona.fid_fisiog || null,
        clase: zona.clase || null,
        claseFao: zona.clase_fao || null,
        paisaje: zona.paisaje || null,
        descPaisaje: zona.desc_paisaje || null,
        descUMape: zona.desc_u_mape || null,
        subPaisaje: zona.sub_paisaje || null,
        descSubpaisaje: zona.desc_subpaisaje || null,
        granPaisaje: zona.gran_paisaje || null,
        descGranpaisaje: zona.desc_granpaisaje || null,
        descProvincia: zona.desc_provincia || null,
        sectores: zona.sectores || null,
        categoria: zona.categoria || null,
        subcat: zona.subcat || null,
        perimeter: zona.perimeter || null,
        area1: zona.area_1 || null,
        hectareas: zona.hectareas ? Number(zona.hectareas.replace(',', '.')) : 0,
        etiqueta: zona.etiqueta || null,
        departamento: zona.departamento || null,
        provincia: zona.provincia || null,
        municipio: zona.municipio || null,
        capital: zona.capital || null,
        leyMun: zona.ley_mun || null,
        fechaLeyMun: zona.fecha_ley_mun || null,
        macroregion: zona.macroregion || null,
        subregion: zona.subregion || null,
        coordenadas: {
          longitud: Number(zona.longitud_x?.replace(',', '.')),
          latitud: Number(zona.latitud_y?.replace(',', '.'))
        }
      };

    } catch (error) {
      this.logger.error('Error en findByCoordinates:', error.message);
      throw new Error(`Error al buscar zona verde: ${error.message}`);
    }
  }
}