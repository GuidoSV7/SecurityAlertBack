import { Injectable } from '@nestjs/common';


import PdfPrinter from 'pdfmake';


@Injectable()
export class ReportsService {

  constructor(

  ) {}


  async reportPDF(data: any) {
    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold', 
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique'
      }
    };
   
    const printer = new PdfPrinter(fonts);
   
    const docDefinition = {
      content: [
        { text: 'Análisis de Incendios y Condiciones del Suelo', style: 'header' },
        
        { text: '\nCondiciones Actuales', style: 'subheader' },
        { text: `Clima Favorable: ${data.condicionesActuales.climaFavorable ? 'Sí' : 'No'}` },
        { text: `Riesgo de Incendio: ${data.condicionesActuales.riesgoIncendio}` },
        { text: `Condiciones del Suelo: ${data.condicionesActuales.condicionesSuelo}` },
        
        { text: '\nEspecies Recomendadas', style: 'subheader' },
        ...data.especiesRecomendadas.map(especie => ({
          text: `• ${especie.nombre}: ${especie.razonRecomendacion}\n`
        })),
        
        { text: '\nÉpocas de Plantación', style: 'subheader' },
        { text: `Óptima: ${data.epocasPlantacion.optima}` },
        { text: `Alternativa: ${data.epocasPlantacion.alternativa}` },
        
        { text: '\nRiesgos Identificados', style: 'subheader' },
        ...data.riesgosIdentificados.map(riesgo => ({
          text: `• ${riesgo.tipo} - Nivel: ${riesgo.nivelRiesgo}\n`
        }))
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10] as [number, number, number, number]
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5] as [number, number, number, number]
        }
      }
    };
   
    return printer.createPdfKitDocument(docDefinition);
   }
  
}