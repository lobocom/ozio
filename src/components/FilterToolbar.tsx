import React from 'react';
import { locations } from '../data/locations';
import { MapPin, Ruler } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

interface FilterToolbarProps {
  selectedLocation: string;
  maxDistance: number;
  onLocationChange: (locationId: string) => void;
  onDistanceChange: (distance: number) => void;
}

const FilterToolbar: React.FC<FilterToolbarProps> = ({
  selectedLocation,
  maxDistance,
  onLocationChange,
  onDistanceChange
}) => {

  const { coordinates, error } = useUser();
  const isMyLocationDisabled = !coordinates && selectedLocation !== 'my-location';

  return (
    <div className="bg-white p-3 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-gray-500" />
        <select
          value={selectedLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="p-2 text-sm border border-gray-300 rounded-md bg-gray-50 text-gray-700"
        >
          {locations.map((location) => (
            <option 
              key={location.id} 
              value={location.id}
              disabled={location.id === '0' && isMyLocationDisabled}
          >
              {location.name} {location.id === '0' && error ? '(No disponible)' : ''}
            </option>
          ))}
        </select>
<> lat:{coordinates?.latitude}  lon:{coordinates?.longitude} </>

      </div>
      
      <div className="flex items-center gap-2">
        <Ruler size={16} className="text-gray-500" />
        <div className="flex items-center gap-1 text-sm text-gray-700">
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
  );
};

export default FilterToolbar;