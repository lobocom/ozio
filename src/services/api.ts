import { events } from '../data/events';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export interface EventsParams {
  pagina?: number;
  categoria?: number;
  cp?: string;
}

export const fetchEvents = async (params: EventsParams = {}): Promise<Event[]> => {
  // If DUMMY_DATA is specified, return static data
  if (API_URL === 'DUMMY_DATA') {
    let filteredEvents = [...events];
    
    // Apply category filter if specified
    if (params.categoria) {
      filteredEvents = filteredEvents.filter(event => event.categoriaId === params.categoria);
    }
    
    return filteredEvents;
  }

  // Otherwise proceed with API call
  const queryParams = new URLSearchParams();
  
  if (params.pagina) queryParams.append('pagina', params.pagina.toString());
  if (params.categoria) queryParams.append('categoria', params.categoria.toString());
  if (params.cp) queryParams.append('cp', params.cp);
  
  const url = `${API_URL}/eventos${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const { data }: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}