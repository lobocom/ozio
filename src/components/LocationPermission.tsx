import React from "react";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface LocationPermissionProps {
  onRequestLocation: () => void;
}

const LocationPermission: React.FC<LocationPermissionProps> = ({
  onRequestLocation,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
      <div className="bg-white rounded-full p-4 mb-4">
        <MapPin size={48} className="text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
        Necesitamos tu ubicación
      </h2>
      <p className="text-gray-600 text-center max-w-sm mb-4">
        Para mostrarte eventos cercanos, necesitamos acceder a tu ubicación.
        También puedes seleccionar una ciudad específica en el filtro superior.
      </p>
      <div className="max-w-md mx-auto mt-10 bg-red-50 border border-red-200 rounded-2xl p-6 shadow">
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Permiso de ubicación requerido
        </h2>
        <p className="text-sm text-red-600 mb-4">
          Para continuar, necesitamos que habilites la ubicación. Sigue estos
          pasos:
        </p>
        <ol className="list-decimal list-inside text-sm text-red-600 space-y-1 mb-4">
          <li>Haz clic en el candado 🔒 al lado de la barra de direcciones.</li>
          <li>
            Busca el permiso de <strong>Ubicación</strong>.
          </li>
          <li>
            Selecciona <strong>Permitir</strong>.
          </li>
          <li>Haz clic en el botón de abajo para recargar la página.</li>
        </ol>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onRequestLocation}
          className="w-full bg-red-600 text-white font-semibold py-2 px-4 rounded-xl hover:bg-red-700 transition"
        >
          Recargar página
        </motion.button>
      </div>
    </div>
  );
};

export default LocationPermission;
