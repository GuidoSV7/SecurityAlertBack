import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import csvParser from 'csv-parser';
import { Readable } from 'stream';

@Injectable()
export class FiresService {
  private readonly apiUrl = 'https://firms.modaps.eosdis.nasa.gov/api/country/csv/82e2e9d309803d114804a9efb711569c/VIIRS_NOAA20_NRT/BOL/10';

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en kilómetros
  }

  async getClosestFire(lat: number, lon: number): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl);
      const data = response.data;

      let closestFire = null;
      let closestDistance = Infinity;

      await new Promise((resolve, reject) => {
        Readable.from(data)
          .pipe(csvParser())
          .on('data', (row) => {
            const fireLat = parseFloat(row.latitude);
            const fireLon = parseFloat(row.longitude);

            const distance = this.calculateDistance(lat, lon, fireLat, fireLon);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestFire = { ...row, distance };
            }
          })
          .on('end', resolve)
          .on('error', reject);
      });

      return closestFire || { message: 'No se encontraron incendios cercanos' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Error al obtener datos de la API de FIRMS',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}