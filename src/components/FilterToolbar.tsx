import React, { useState } from 'react';
import { locations } from "../data/locations";
import { MapPin, Ruler, Calendar, X } from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion, AnimatePresence } from "framer-motion";

interface FilterToolbarProps {
  selectedLocation: string;
  maxDistance: number;
  fromDate: Date | null;
  onLocationChange: (locationId: string) => void;
  onDistanceChange: (distance: number) => void;
  onFromDateChange: (date: Date | null) => void;
}

const FilterToolbar: React.FC<FilterToolbarProps> = ({
  selectedLocation,
  maxDistance,
  fromDate,
  onLocationChange,
  onDistanceChange,
  onFromDateChange,
}) => {
  const { error } = useUser();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showDistancePicker, setShowDistancePicker] = useState(false);

  const formatDateLabel = (date: Date | null): string => {
    if (!date) return "Desde hoy";
    return `Desde ${format(date, "d 'de' MMM", { locale: es })}`;
  };

  const handleDateChange = (dateString: string) => {
    if (dateString) {
      onFromDateChange(new Date(dateString));
    } else {
      onFromDateChange(null);
    }
    setShowDatePicker(false);
  };

  const handleLocationSelect = (locationId: string) => {
    onLocationChange(locationId);
    setShowLocationPicker(false);
  };

  const handleDistanceSelect = (distance: number) => {
    onDistanceChange(distance);
    setShowDistancePicker(false);
  };

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFromDateChange(null);
  };

  const today = new Date().toISOString().split("T")[0];

  const selectedLocationName =
    locations.find((loc) => loc.id === selectedLocation)?.name ||
    "Seleccionar...";

  const distanceOptions = [5, 10, 25, 50, 100];

  return (
    <>
      <div className="bg-purple-50 p-3 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-1.5">
          <MapPin size={16} className="text-gray-500" />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowLocationPicker(true)}
            className="text-sm font-semibold text-gray-800 hover:text-indigo-600"
          >
            <span>{selectedLocationName}</span>
          </motion.button>
        </div>

          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-gray-500" />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDatePicker(true)}
              className="flex items-center gap-1 text-sm font-semibold text-gray-800 hover:text-indigo-600"
            >
              <span>{formatDateLabel(fromDate)}</span>
              {fromDate && (
                <X
                  size={14}
                  className="text-gray-400 hover:text-red-600"
                  onClick={clearDate}
                />
              )}
            </motion.button>
          </div>

          <div className="flex items-center gap-1.5">
            <Ruler size={16} className="text-gray-500" />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDistancePicker(true)}
              className="text-sm font-semibold text-gray-800 hover:text-indigo-600"
            >
              <span>{maxDistance} km</span>
            </motion.button>
          </div>

      </div>

      <AnimatePresence>
        {showDatePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowDatePicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 m-4 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                Filtrar desde fecha
              </h3>

              <div className="space-y-3">
                <button
                  onClick={() => handleDateChange("")}
                  className={`w-full p-3 text-left rounded-lg border ${
                    !fromDate
                      ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  Desde hoy (por defecto)
                </button>

                <div className="border-t pt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Seleccionar fecha específica:
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={fromDate ? fromDate.toISOString().split("T")[0] : ""}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLocationPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowLocationPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 m-4 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                Seleccionar ubicación
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationSelect(location.id)}
                    disabled={location.id === "0" && !!error}
                    className={`w-full p-3 text-left rounded-lg border ${
                      selectedLocation === location.id
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                        : "border-gray-200 hover:bg-gray-50"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {location.name}{" "}
                    {location.id === "0" && error ? "(No disponible)" : ""}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowLocationPicker(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDistancePicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowDistancePicker(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 m-4 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                Seleccionar distancia
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {distanceOptions.map((distance) => (
                  <button
                    key={distance}
                    onClick={() => handleDistanceSelect(distance)}
                    className={`w-full p-3 text-left rounded-lg border ${
                      maxDistance === distance
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {distance} km
                  </button>
                ))}
              </div>
              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowDistancePicker(false)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterToolbar;
