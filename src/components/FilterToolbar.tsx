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

  const clearDate = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFromDateChange(null);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <div className="bg-white p-3 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-gray-500" />
          <select
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="p-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-700"
          >
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}{" "}
                {location.id === "0" && error ? "(No disponible)" : ""}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDatePicker(true)}
              className="flex items-center gap-1 p-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-700 hover:bg-gray-100"
            >
              <span>{formatDateLabel(fromDate)}</span>
              {fromDate && (
                <X
                  size={14}
                  className="text-gray-400 hover:text-gray-600"
                  onClick={clearDate}
                />
              )}
            </motion.button>
          </div>

          {/* Distance Filter */}
          <div className="flex items-center gap-2">
            <Ruler size={16} className="text-gray-500" />
            <select
              value={maxDistance}
              onChange={(e) => onDistanceChange(parseInt(e.target.value, 10))}
              className="p-2 text-sm border border-gray-300 rounded-md bg-gray-50"
            >
              <option value={5}>5 km</option>
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
            </select>
          </div>
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
    </>
  );
};

export default FilterToolbar;
