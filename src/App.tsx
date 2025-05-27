import React, { useState, useEffect, useRef } from "react";
import { Evento } from "./types";
import { locations } from "./data/locations";
import { fetchEventos } from "./services/api";
import { AnimatePresence } from "framer-motion";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useUser } from './contexts/UserContext';
import { Toast } from 'primereact/toast';

// Componentes
import CategoryScroller from "./components/CategoryScroller";
import FilterToolbar from "./components/FilterToolbar";
import EventoList from "./components/EventoList";
import BottomTabs from "./components/BottomTabs";
import EventoDetail from "./components/EventoDetail";

function App() {
  const { coordinates, loading: locationLoading } = useUser();
  const toast = useRef<Toast>(null);

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useLocalStorage(
    "selectedLocation",
    locations[0].id
  );
  const [maxDistance, setMaxDistance] = useLocalStorage("maxDistance", 25);
  const [selectedEvent, setSelectedEvent] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch eventos on component mount
  useEffect(() => {
    const loadEventos = async () => {
      try {
        setLoading(true);
        
        // Get coordinates based on selected location
        let locationCoords;
        if (selectedLocation === '0') {
          locationCoords = coordinates;
        } else {
          const location = locations.find(loc => loc.id === selectedLocation);
          locationCoords = location?.coordinates;
        }

        const data = await fetchEventos({
          categoria: selectedCategoryId ?? undefined,
          coordinates: locationCoords ?? undefined,
          distancia: maxDistance
        });
        setEventos(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar los eventos");
        toast.current?.show({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al cargar los eventos',
          life: 3000
        });
        console.error("Error loading eventos:", err);
      } finally {
        setLoading(false);
      }
    };

    if (!locationLoading) {
      loadEventos();
    }
  }, [selectedCategoryId, selectedLocation, coordinates, locationLoading, maxDistance]);

  // Handle category selection
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId
    );
  };

  // Handle evento click
  const handleEventClick = (evento: Evento) => {
    setSelectedEvent(evento);
  };

  // Handle notify button click
  const handleNotifyClick = () => {
    toast.current?.show({
      severity: 'success',
      summary: 'Notificación',
      detail: 'Notificación configurada correctamente',
      life: 3000
    });
  };

  // Handle publish button click
  const handlePublishClick = () => {
    toast.current?.show({
      severity: 'info',
      summary: 'Publicar evento',
      detail: 'Próximamente podrás publicar tus eventos',
      life: 3000
    });
  };

  // Render loading state
  if (loading || locationLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Cargando eventos...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pb-16">
      <Toast ref={toast} />
      
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white shadow-sm">
          <CategoryScroller
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={handleCategorySelect}
          />
        </div>

        <FilterToolbar
          selectedLocation={selectedLocation}
          maxDistance={maxDistance}
          onLocationChange={setSelectedLocation}
          onDistanceChange={setMaxDistance}
        />
      </div>

      <div className="pt-[190px] pb-20">
        <EventoList eventos={eventos} onEventClick={handleEventClick} />
      </div>
      
      <BottomTabs
        onNotifyClick={handleNotifyClick}
        onPublishClick={handlePublishClick}
      />

      {/* Evento Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventoDetail
            evento={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            toast={toast}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;