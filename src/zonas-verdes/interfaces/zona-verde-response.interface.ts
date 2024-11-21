export interface IZonaVerdeResponse {
    distanciaKm: number;
    descripcion: string | null;
    area: string | null;
    rangoAltitud: string | null;
    departamento: string | null;
    provincia: string | null;
    municipio: string | null;
    claseFao: string | null;
    categoria: string | null;
    subcat: string | null;
    hectareas: number;
    coordenadas: {
      longitud: number;
      latitud: number;
    };
    fid?: string | null;
    idC?: string | null;
    shapeLength?: string | null;
    shapeArea?: string | null;
    fidFisiog?: string | null;
    clase?: string | null;
    paisaje?: string | null;
    descPaisaje?: string | null;
    descUMape?: string | null;
    subPaisaje?: string | null;
    descSubpaisaje?: string | null;
    granPaisaje?: string | null;
    descGranpaisaje?: string | null;
    descProvincia?: string | null;
    sectores?: string | null;
    perimeter?: string | null;
    area1?: string | null;
    etiqueta?: string | null;
    capital?: string | null;
    leyMun?: string | null;
    fechaLeyMun?: string | null;
    macroregion?: string | null;
    subregion?: string | null;
  }
  