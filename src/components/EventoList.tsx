import React from 'react';
import { Evento } from '../types';
import EventoCard from './EventoCard';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { SearchX, MapPin } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface EventoListProps {
  eventos: Evento[];
  onEventClick: (evento: Evento) => void;
}

const EventoList: React.FC<EventoListProps> = ({ eventos, onEventClick }) => {
  const { coordinates, error: locationError } = useUser();

  // If location is needed but not available, show the permission request
  if (!coordinates && locationError) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="bg-white rounded-full p-4 mb-4">
          <MapPin size={48} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Necesitamos tu ubicación
        </h2>
        <p className="text-gray-600 text-center max-w-sm mb-6">
          Para mostrarte eventos cercanos, necesitamos acceder a tu ubicación. También puedes seleccionar una ciudad específica en el menú superior.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        >
          Permitir ubicación
        </button>
      </div>
    );
  }

  // If there are no events, show the empty state message
  if (eventos.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="bg-white rounded-full p-4 mb-4">
          <SearchX size={48} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          No hay eventos disponibles
        </h2>
        <p className="text-gray-600 text-center max-w-sm">
          No hemos encontrado eventos en tu zona para los filtros aplicados. Prueba a cambiar los filtros o ampliar la distancia de búsqueda.
        </p>
      </div>
    );
  }

  // Group eventos by date
  const groupedEventos: { [key: string]: Evento[] } = {};
  
  eventos.forEach(evento => {
    try {
      // Ensure we have a valid date string
      if (!evento.fechaInicio) {
        console.warn('Evento with missing date:', evento);
        return;
      }

      // Parse the date and validate it
      const eventoDate = parseISO(evento.fechaInicio);
      if (isNaN(eventoDate.getTime())) {
        console.warn('Invalid date format:', evento.fechaInicio);
        return;
      }

      const dateKey = format(eventoDate, 'yyyy-MM-dd');
      if (!groupedEventos[dateKey]) {
        groupedEventos[dateKey] = [];
      }
      groupedEventos[dateKey].push(evento);
    } catch (error) {
      console.error('Error processing evento date:', error, evento);
    }
  });
  
  // Sort dates
  const sortedDates = Object.keys(groupedEventos).sort();
  
  const getDateHeader = (dateString: string): string => {
    try {
      const date = parseISO(dateString);
      if (isNaN(date.getTime())) {
        return 'Fecha no disponible';
      }
      
      if (isToday(date)) {
        return 'Hoy';
      } else if (isTomorrow(date)) {
        return 'Mañana';
      } else {
        return format(date, "d 'de' MMMM", { locale: es });
      }
    } catch (error) {
      console.error('Error formatting date header:', error);
      return 'Fecha no disponible';
    }
  };
  
  return (
    <motion.div className="px-4 py-2 flex-1 overflow-auto">
      {sortedDates.map(dateKey => (
        <div key={dateKey} className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 sticky top-0 bg-gray-100 py-2 px-2 rounded-md">
            {getDateHeader(dateKey)}
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {groupedEventos[dateKey].map(evento => (
              <EventoCard 
                key={evento.id} 
                evento={evento} 
                onClick={onEventClick}
              />
            ))}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default EventoList;