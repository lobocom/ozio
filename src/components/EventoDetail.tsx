import React, { useState } from 'react';
import { Evento } from '../types';
import { X, MapPin, Calendar, Globe, Phone, Mail, Euro, Share2, Navigation, Bell } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast } from 'primereact/toast';
import { Carousel } from 'primereact/carousel';

interface EventoDetailProps {
  evento: Evento;
  onClose: () => void;
  toast: React.RefObject<Toast>;
}

const EventoDetail: React.FC<EventoDetailProps> = ({ evento, onClose, toast }) => {
  const startDate = new Date(evento.fechaInicio);
  const [showActions, setShowActions] = useState(false);
  const [activeTab, setActiveTab] = useState<'share' | 'directions' | 'reminder' | null>(null);
  
  const images = evento.resources.map(resource => ({
    id: resource.id,
    url: resource.uris.optimized,
    thumbnail: resource.uris.thumbnail
  }));
  
  const handleShare = (method: 'email' | 'whatsapp') => {
    const eventText = `${evento.tituloEs}\n${format(startDate, "d 'de' MMMM", { locale: es })}\n${evento.direccion}, ${evento.localidad}`;
    
    if (method === 'email') {
      window.location.href = `mailto:?subject=Evento: ${evento.tituloEs}&body=${encodeURIComponent(eventText)}`;
    } else if (method === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(eventText)}`, '_blank');
    }
    setShowActions(false);
    toast.current?.show({
      severity: 'success',
      summary: 'Compartido',
      detail: `Evento compartido por ${method === 'email' ? 'email' : 'WhatsApp'}`,
      life: 3000
    });
  };

  const handleGetDirections = () => {
    const address = encodeURIComponent(`${evento.direccion}, ${evento.localidad}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
    setShowActions(false);
    toast.current?.show({
      severity: 'info',
      summary: 'Direcciones',
      detail: 'Abriendo Google Maps con las direcciones',
      life: 3000
    });
  };

  const handleReminder = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Recordatorio',
      detail: 'Recordatorio guardado correctamente',
      life: 3000
    });
    setShowActions(false);
  };

  const imageTemplate = (image: { url: string }) => {
    return (
      <div className="w-full h-64">
        <img 
          src={image.url} 
          alt={evento.tituloEs}
          className="w-full h-full object-cover"
        />
      </div>
    );
  };
  
  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-white flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="relative h-64 bg-gray-200">
        <Carousel
          value={images}
          numVisible={1}
          numScroll={1}
          className="h-full"
          itemTemplate={imageTemplate}
          showNavigators={images.length > 1}
          showIndicators={images.length > 1}
        />
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full p-2 z-10"
        >
          <X size={20} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
          <h1 className="text-2xl font-bold">{evento.tituloEs}</h1>
        </div>
      </div>
      
      <div className="flex items-center p-4 border-b">
        <div>
          <span className="text-indigo-600 text-sm font-semibold">
            {evento.categoriaPrincipal.tituloEs}
          </span>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin size={14} className="mr-1" />
            <span>{evento.direccion}, {evento.localidad}</span>
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
        <p className="text-gray-700 mb-4">{evento.descripcionEs}</p>
        
        <div className="space-y-3">
          {evento.precio > 0 && (
            <div className="flex items-center text-gray-600">
              <Euro size={18} className="mr-2" />
              <span>{evento.precio} €</span>
            </div>
          )}
          
          {evento.contactoWeb && (
            <div className="flex items-center text-gray-600">
              <Globe size={18} className="mr-2" />
              <a href={evento.contactoWeb} target="_blank" rel="noopener noreferrer" 
                 className="text-indigo-600 hover:underline">
                Sitio web
              </a>
            </div>
          )}
          
          {evento.contactoTelefono && (
            <div className="flex items-center text-gray-600">
              <Phone size={18} className="mr-2" />
              <a href={`tel:${evento.contactoTelefono}`} className="hover:underline">
                {evento.contactoTelefono}
              </a>
            </div>
          )}
          
          {evento.contactoEmail && (
            <div className="flex items-center text-gray-600">
              <Mail size={18} className="mr-2" />
              <a href={`mailto:${evento.contactoEmail}`} className="hover:underline">
                {evento.contactoEmail}
              </a>
            </div>
          )}
        </div>
        
        {evento.tics.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Características</h3>
            <div className="flex flex-wrap gap-2">
              {evento.tics.map(tic => (
                <span key={tic.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {tic.tituloEs}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-between gap-2">
          <button
            onClick={() => {
              setActiveTab('share');
              setShowActions(true);
            }}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 rounded-lg flex flex-col items-center text-gray-600"
          >
            <Share2 size={20} className="mb-1" />
            <span className="text-sm">Compartir</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('directions');
              setShowActions(true);
            }}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 rounded-lg flex flex-col items-center text-gray-600"
          >
            <Navigation size={20} className="mb-1" />
            <span className="text-sm">Cómo llegar</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('reminder');
              setShowActions(true);
            }}
            className="flex-1 py-3 px-4 bg-white border border-gray-200 rounded-lg flex flex-col items-center text-gray-600"
          >
            <Bell size={20} className="mb-1" />
            <span className="text-sm">Recuérdamelo</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50"
            onClick={() => setShowActions(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white w-full rounded-t-xl p-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
              
              {activeTab === 'share' && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold mb-4">Compartir evento</h3>
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="w-full py-3 bg-green-500 text-white font-medium rounded-lg flex items-center justify-center"
                  >
                    Compartir por WhatsApp
                  </button>
                  <button 
                    onClick={() => handleShare('email')}
                    className="w-full py-3 bg-gray-800 text-white font-medium rounded-lg flex items-center justify-center"
                  >
                    Compartir por Email
                  </button>
                </div>
              )}
              
              {activeTab === 'directions' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Cómo llegar</h3>
                  <button 
                    onClick={handleGetDirections}
                    className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg flex items-center justify-center mb-4"
                  >
                    Abrir en Google Maps
                  </button>
                  <div className="aspect-video rounded-lg overflow-hidden">
                 <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(
                        `${evento.direccion}, ${evento.localidad}`
                      )}`}
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              )}
              
              {activeTab === 'reminder' && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Guardar recordatorio</h3>
                  <button 
                    onClick={handleReminder}
                    className="w-full py-3 bg-indigo-600 text-white font-medium rounded-lg flex items-center justify-center"
                  >
                    Guardar recordatorio
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default EventoDetail;