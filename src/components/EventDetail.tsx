import React from 'react';
import { Event } from '../types';
import { X, MapPin, Calendar, Globe, Phone, Mail, Euro } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface EventDetailProps {
  event: Event;
  onClose: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onClose }) => {
  const imageUrl = event.resources[0]?.uris.optimized;
  const startDate = new Date(event.fechaInicio);
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-white flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="relative h-64 bg-gray-200">
        {imageUrl && (
          <img 
            src={imageUrl}
            alt={event.tituloEs}
            className="w-full h-full object-cover"
          />
        )}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2"
        >
          <X size={20} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h1 className="text-2xl font-bold">{event.tituloEs}</h1>
        </div>
      </div>
      
      <div className="flex items-center p-4 border-b">
        <div>
          <span className="text-indigo-600 text-sm font-semibold">
            {event.categoriaPrincipal.tituloEs}
          </span>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{event.direccion}, {event.localidad}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center text-gray-600">
          <Calendar size={18} className="mr-1" />
          <span className="text-sm">
            {format(startDate, "d 'de' MMMM", { locale: es })}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-auto">
        <h2 className="text-lg font-semibold mb-2">Detalles</h2>
        <p className="text-gray-700 mb-4">{event.descripcionEs}</p>
        
        <div className="space-y-3">
          {event.precio > 0 && (
            <div className="flex items-center text-gray-600">
              <Euro size={18} className="mr-2" />
              <span>{event.precio} €</span>
            </div>
          )}
          
          {event.contactoWeb && (
            <div className="flex items-center text-gray-600">
              <Globe size={18} className="mr-2" />
              <a href={event.contactoWeb} target="_blank" rel="noopener noreferrer" 
                 className="text-indigo-600 hover:underline">
                Sitio web
              </a>
            </div>
          )}
          
          {event.contactoTelefono && (
            <div className="flex items-center text-gray-600">
              <Phone size={18} className="mr-2" />
              <a href={`tel:${event.contactoTelefono}`} className="hover:underline">
                {event.contactoTelefono}
              </a>
            </div>
          )}
          
          {event.contactoEmail && (
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-2" />
              <a href={`mailto:${event.contactoEmail}`} className="hover:underline">
                {event.contactoEmail}
              </a>
            </div>
          )}
        </div>
        
        {event.tics.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <div className="flex flex-wrap gap-2">
              {event.tics.map(tic => (
                <span key={tic.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {tic.tituloEs}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-4 border-t">
        <button 
          className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg"
        >
          Inscribirme
        </button>
      </div>
    </motion.div>
  );
};

export default EventDetail;