import { eventos } from '../data/eventos';
import { ApiResponse, Evento } from '../types';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api/v1';

export interface EventosParams {
  pagina?: number;
  categoria?: number;
  cp?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  distancia?: number;
}

export const fetchEventos = async (params: EventosParams = {}): Promise<Evento[]> => {
  // If DUMMY_DATA is specified, return static data
  if (API_URL === 'DUMMY_DATA') {
    let filteredEventos = [...eventos];
    
    // Apply category filter if specified
    if (params.categoria) {
      filteredEventos = filteredEventos.filter(evento => (evento.categoriaPrincipal.id === params.categoria) || (evento.categoriaSecundaria && evento.categoriaSecundaria.id === params.categoria));
    }
    return filteredEventos;
  }

  // Otherwise proceed with API call
  const queryParams = new URLSearchParams();
  
  if (params.pagina) queryParams.append('pagina', params.pagina.toString());
  if (params.categoria) queryParams.append('categoria', params.categoria.toString());
  if (params.cp) queryParams.append('cp', params.cp);
  if (params.coordinates) {
    queryParams.append('lat', params.coordinates.latitude.toString());
    queryParams.append('lng', params.coordinates.longitude.toString());
  }
  if (params.distancia) queryParams.append('distancia', params.distancia.toString());

  const url = `${API_URL}/eventos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const { data }: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching eventos:', error);
    throw error;
  }
}