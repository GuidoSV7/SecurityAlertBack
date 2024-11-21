import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ReportPDFUseCase } from './use-cases/reportpdf.use.case';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async reportPDF(weatherData: any, firesData: any, zonasVerdesData: any): Promise<any> {
    try {
      const prompt = this.generatePrompt(weatherData, firesData, zonasVerdesData);
      const analysis = await ReportPDFUseCase(this.openai, { prompt });
      
      // Aquí deberías convertir el análisis a PDF
      // Por ahora, solo devuelve el análisis
      return analysis;
    } catch (error) {
      console.error('Error en ReportPDFUseCase:', error);
      throw error;
    }
  }

  private generatePrompt(weatherData: any, firesData: any, zonasVerdesData: any): string {
    return `
    Analiza estos datos para generar recomendaciones de reforestación:

    DATOS DEL CLIMA:
    Temperatura máxima: ${weatherData.temperatura_max}°C
    Temperatura actual: ${weatherData.temperatura_actual}°C
    Precipitación: ${weatherData.precipitacion}mm
    Humedad: ${weatherData.humedad}%
    Velocidad del viento: ${weatherData.velocidad_viento}m/s
    Fecha: ${weatherData.fecha_consulta}

    DATOS DE INCENDIOS:
    Temperatura de brillo: ${firesData.bright_ti4}
    Fecha de adquisición: ${firesData.acq_date}
    Confianza: ${firesData.confidence}
    Momento del día: ${firesData.daynight}
    Distancia: ${firesData.distance}km

    DATOS DE LA ZONA:
    Área: ${zonasVerdesData.area}
    Altitud: ${zonasVerdesData.rangoAltitud}
    Clase de suelo: ${zonasVerdesData.claseFao}
    Hectáreas: ${zonasVerdesData.hectareas}
    Categoría: ${zonasVerdesData.categoria}
    Subcategoría: ${zonasVerdesData.subcat}
    Ubicación: ${zonasVerdesData.departamento}, ${zonasVerdesData.provincia}, ${zonasVerdesData.municipio}
    Región: ${zonasVerdesData.macroregion}
    `;
  }
}
