import React, { useState, useEffect } from "react";
import { Event } from "./types";
import { locations } from "./data/locations";
import { fetchEvents } from "./services/api";
import { AnimatePresence } from "framer-motion";
import { useLocalStorage } from "./hooks/useLocalStorage";

// Componentes
import CategoryScroller from "./components/CategoryScroller";
import FilterToolbar from "./components/FilterToolbar";
import EventList from "./components/EventList";
import BottomTabs from "./components/BottomTabs";
import EventDetail from "./components/EventDetail";

function App() {
  // State
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useLocalStorage(
    "selectedLocation",
    locations[0].id
  );
  const [maxDistance, setMaxDistance] = useLocalStorage("maxDistance", 25);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch events on component mount
  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const data = await fetchEvents({
          categoria: selectedCategoryId ?? undefined,
        });
        setEvents(data);
        setFilteredEvents(data);
        setError(null);
      } catch (err) {
        setError("Error al cargar los eventos");
        console.error("Error loading events:", err);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [selectedCategoryId]);

  // Filter events when filters change
  useEffect(() => {
    let filtered = [...events];

    // Filter by location
    if (selectedLocation !== "8") {
      // '8' is 'Todas' (All locations)
      const locationName = locations.find(
        (loc) => loc.id === selectedLocation
      )?.name;
      if (locationName) {
        filtered = filtered.filter((event) => event.localidad === locationName);
      }
    }

    // Sort by date
    filtered.sort(
      (a, b) =>
        new Date(a.fechaInicio).getTime() - new Date(b.fechaInicio).getTime()
    );

    setFilteredEvents(filtered);
  }, [selectedLocation, maxDistance, events]);

  // Handle category selection
  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategoryId((prevId) =>
      prevId === categoryId ? null : categoryId
    );
  };

  // Handle event click
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  // Handle notify button click
  const handleNotifyClick = () => {
    alert("Notificación configurada!");
  };

  // Handle publish button click
  const handlePublishClick = () => {
    alert("Formulario para publicar un evento");
  };

  // Render loading state
  if (loading) {
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
        <EventList events={filteredEvents} onEventClick={handleEventClick} />
      </div>
      
      <BottomTabs
        onNotifyClick={handleNotifyClick}
        onPublishClick={handlePublishClick}
      />

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
