export interface IWeatherService {
    getWeather(weatherRequest: IWeatherRequest): Promise<IWeatherResponse>;
  }
  
  export interface IWeatherRequest {
    lat: number;
    lon: number;
  }
  
  export interface IWeatherResponse {
    temperatura_max: number;
    temperatura_actual: number;
    precipitacion: number;
    humedad: number;
    velocidad_viento: number;
    fecha_consulta: string;
  }