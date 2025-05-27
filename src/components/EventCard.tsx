import React from 'react';
import { Event } from '../types';
import { MapPin, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const imageUrl = event.resources[0]?.uris.optimized;
  const startDate = new Date(event.fechaInicio);
  
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-3 flex"
      whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(event)}
      layout
    >
      <div className="p-4 flex-1">
        <div className="flex items-center mb-1">
          <span className="text-xs font-semibold text-indigo-600">
            {event.categoriaPrincipal.tituloEs} /  {event.categoriaSecundaria?.tituloEs}
          </span>
          {event.gratuito && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Gratuito
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-800 mb-1">{event.tituloEs}</h3>
        <div className="flex items-center text-gray-500 text-xs">
          <MapPin size={12} className="mr-1" />
          <span>{event.localidad}</span>
          <span className="mx-1">•</span>
          <span>{format(startDate, "d 'de' MMMM", { locale: es })}</span>
        </div>
      </div>
      
      <div className="w-24 h-24 bg-gray-200 relative">
        {imageUrl && (
          <img 
            src={imageUrl}
            alt={event.tituloEs}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-sm">
          <MoveRight size={16} className="text-gray-500" />
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;