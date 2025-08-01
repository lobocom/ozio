import React from 'react';
import { Evento } from '../types';
import EventoCard from './EventoCard';
import { format, isToday, isTomorrow, parseISO, isAfter, startOfDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { SearchX } from 'lucide-react';

interface EventoListProps {
  eventos: Evento[];
  onEventClick: (evento: Evento) => void;
  selectedCategories: number[];
}

const EventoList: React.FC<EventoListProps> = ({ eventos, onEventClick, selectedCategories }) => {


  // Si no tenemos eventos, mostramos un mensaje
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


  // Procesamos eventos para gesionar los eventos multi-dia
  const processedEventos: Evento[] = [];
  const today = startOfDay(new Date());


  eventos.forEach(evento => {
    try {
      // Ensure we have a valid date string
      if (!evento.fechaInicio) {
        console.warn('Evento with missing date:', evento);
        return;
      }

      // Parse the dates and validate them
      const startDate = parseISO(evento.fechaInicio);
      const endDate = evento.fechaFin ? parseISO(evento.fechaFin) : startDate;

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.warn('Invalid date format:', evento.fechaInicio, evento.fechaFin);
        return;
      }

       // Determine which date to show the event on
      let displayDate = startDate;
      
      // If the start date is before today, show it today (for ongoing events)
      if (isAfter(today, startOfDay(startDate))) {
        displayDate = today;
      }

       // Create a modified evento with the display date
      const modifiedEvento = {
        ...evento,
        fechaInicio: displayDate.toISOString(),
        // Keep original end date for duration calculation
        fechaFin: evento.fechaFin || evento.fechaInicio
      };

      processedEventos.push(modifiedEvento);
    } catch (error) {
      console.error('Error processing evento:', evento, error);
    }
  });

  
  // Group eventos by date
  const groupedEventos: { [key: string]: Evento[] } = {};
  
   processedEventos.forEach(evento => {
    try {
      const eventoDate = parseISO(evento.fechaInicio);
      const dateKey = format(eventoDate, 'yyyy-MM-dd');
      if (!groupedEventos[dateKey]) {
        groupedEventos[dateKey] = [];
      }
      groupedEventos[dateKey].push(evento);
    } catch (error) {
      console.error('Error grouping evento by date:', error, evento);
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
          <h2 className="text-lg font-bold text-gray-800 mb-1 sticky top-0 bg-gray-100 py-1 px-2 rounded-md">
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
                selectedCategories={selectedCategories}
              />
            ))}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default EventoList;