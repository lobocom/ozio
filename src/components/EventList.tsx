import React from 'react';
import { Event } from '../types';
import EventCard from './EventCard';
import { format, isToday, isTomorrow, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface EventListProps {
  events: Event[];
  onEventClick: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onEventClick }) => {
  // Group events by date
  const groupedEvents: { [key: string]: Event[] } = {};
  
  events.forEach(event => {
    try {
      // Ensure we have a valid date string
      if (!event.fechaInicio) {
        console.warn('Event with missing date:', event);
        return;
      }

      // Parse the date and validate it
      const eventDate = parseISO(event.fechaInicio);
      if (isNaN(eventDate.getTime())) {
        console.warn('Invalid date format:', event.fechaInicio);
        return;
      }

      const dateKey = format(eventDate, 'yyyy-MM-dd');
      if (!groupedEvents[dateKey]) {
        groupedEvents[dateKey] = [];
      }
      groupedEvents[dateKey].push(event);
    } catch (error) {
      console.error('Error processing event date:', error, event);
    }
  });
  
  // Sort dates
  const sortedDates = Object.keys(groupedEvents).sort();
  
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
            {groupedEvents[dateKey].map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={onEventClick}
              />
            ))}
          </motion.div>
        </div>
      ))}
    </motion.div>
  );
};

export default EventList;