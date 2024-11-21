import { Controller, Post, Res, HttpStatus, Body } from '@nestjs/common';
import { Response } from 'express';
import { GptService } from './gpt.service';
import { FiresService } from 'src/firms/fires.service';
import { WeatherService } from 'src/weather/weather.service';
import { ZonasVerdesService } from 'src/zonas-verdes/zonas-verdes.service';
import { WeatherRequestDto } from 'src/weather/dto/weather-request.dto';
import { LocationDto } from './dtos/location.dto';
import { ICoordenadas } from './../zonas-verdes/interfaces/coordenadas.interface';
const PDFDocument = require('pdfkit');

@Controller('gpt')
export class GptController {
  constructor(
    private readonly gptService: GptService,
    private readonly fireService: FiresService,
    private readonly weatherService: WeatherService,
    private readonly zonasVerdes: ZonasVerdesService
  ) {}

  @Post('reportPDF')
  async downloadLocationPdf(
    @Body() locationDto: LocationDto,
    @Res() res: Response,
  ) {
    try {
      const { latitud, longitud } = locationDto;

      // Crear WeatherRequestDto
      const weatherRequest = new WeatherRequestDto();
      weatherRequest.lat = latitud;
      weatherRequest.lon = longitud;

      // Crear ICoordenadas
      const zonaVerdeRequest: ICoordenadas = {
        longitud,
        latitud
      };

      // Obtener datos de los diferentes servicios
      const [weatherData, firesData, zonasVerdesData] = await Promise.all([
        this.weatherService.getWeather(weatherRequest),
        this.fireService.getClosestFire(latitud, longitud),
        this.zonasVerdes.findByCoordinates(zonaVerdeRequest)
      ]);

      // Obtener el análisis de GPT
      const analysisData = await this.gptService.reportPDF(weatherData, firesData, zonasVerdesData);

      // Crear PDF con el análisis
      const doc = new PDFDocument();
      const chunks: any[] = [];

      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(chunks);
        res.set({
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename=reforestation-report.pdf',
          'Content-Length': pdfBuffer.length,
        });
        res.end(pdfBuffer);
      });

      // Agregar contenido al PDF
      doc.fontSize(20).text('Informe de Reforestación', { align: 'center' });
      doc.moveDown();

      // Condiciones Actuales
      doc.fontSize(16).text('Condiciones Actuales');
      doc.fontSize(12).text(`Clima Favorable: ${analysisData.condicionesActuales.climaFavorable ? 'Sí' : 'No'}`);
      doc.fontSize(12).text(`Riesgo de Incendio: ${analysisData.condicionesActuales.riesgoIncendio}`);
      doc.fontSize(12).text(`Condiciones del Suelo: ${analysisData.condicionesActuales.condicionesSuelo}`);
      doc.moveDown();

      // Especies Recomendadas
      doc.fontSize(16).text('Especies Recomendadas');
      analysisData.especiesRecomendadas.forEach((especie: any) => {
        doc.fontSize(12).text(`- ${especie.nombre}: ${especie.razonRecomendacion}`);
      });
      doc.moveDown();

      // Épocas de Plantación
      doc.fontSize(16).text('Épocas de Plantación');
      doc.fontSize(12).text(`Óptima: ${analysisData.epocasPlantacion.optima}`);
      doc.fontSize(12).text(`Alternativa: ${analysisData.epocasPlantacion.alternativa}`);
      doc.moveDown();

      // Riesgos Identificados
      doc.fontSize(16).text('Riesgos Identificados');
      analysisData.riesgosIdentificados.forEach((riesgo: any) => {
        doc.fontSize(12).text(`- ${riesgo.tipo} (${riesgo.nivelRiesgo})`);
      });
      doc.moveDown();

      // Plan de Monitoreo
      doc.fontSize(16).text('Plan de Monitoreo');
      doc.fontSize(12).text(`Frecuencia: ${analysisData.planMonitoreo.frecuencia}`);
      doc.fontSize(12).text('Parámetros a monitorear:');
      analysisData.planMonitoreo.parametros.forEach((parametro: string) => {
        doc.fontSize(12).text(`- ${parametro}`);
      });

      // Finalizar el PDF
      doc.end();

    } catch (error) {
      console.error('Error en downloadLocationPdf:', error);
      res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message || 'Error al generar el PDF',
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
  }
}