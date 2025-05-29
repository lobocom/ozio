import React from 'react';
import { Evento } from '../types';
import { MapPin, MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { findCategoryById, getCategoryIcon } from '../data/categories';

interface EventoCardProps {
  evento: Evento;
  onClick: (evento: Evento) => void;
  selectedCategories: number[];
}

const EventoCard: React.FC<EventoCardProps> = ({ evento, onClick, selectedCategories }) => {
  const imageUrl = evento.resources[0]?.uris.optimized;
  const startDate = new Date(evento.fechaInicio);
  
  // Determine which category to show based on the selected categories
  const showSecondaryCategory = selectedCategories.includes(evento.categoriaSecundaria?.id ?? -1);
  const showPrimaryCategory = selectedCategories.includes(evento.categoriaPrincipal.id);
  
  const categoryToShow = showSecondaryCategory ? 
    evento.categoriaSecundaria : 
    evento.categoriaPrincipal;
  
  const categoria = findCategoryById(categoryToShow?.id ?? evento.categoriaPrincipal.id);
  const CategoryIcon = getCategoryIcon(categoria?.icon ?? 'Ticket');

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-sm overflow-hidden mb-3 flex"
      whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(0,0,0,0.05)' }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(evento)}
      layout
    >

         <div 
        className="w-16 flex items-center justify-center"
        style={{ backgroundColor: categoria?.color ?? '#000000' }}
      >
        <CategoryIcon size={24} className="text-white" />
      </div>

      <div className="p-4 flex-1">
        <div className="flex items-center mb-1">
          <span  className="text-xs font-semibold"
            style={{ color: categoria?.color ?? '#000000' }}>
            {categoryToShow?.tituloEs ?? evento.categoriaPrincipal.tituloEs}
          </span>
          {evento.gratuito && (
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
              Gratuito
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-800 mb-1">{evento.tituloEs}</h3>
        <div className="flex items-center text-gray-500 text-xs">
          <MapPin size={12} className="mr-1" />
          <span>{evento.localidad}</span>
          <span className="mx-1">•</span>
          <span>{format(startDate, "d 'de' MMMM", { locale: es })}</span>
        </div>
      </div>
      
      <div className="w-24 h-24 bg-gray-200 relative">
        {imageUrl && (
          <img 
            src={imageUrl}
            alt={evento.tituloEs}
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

export default EventoCard;