import React, { createContext, useContext, useState, useEffect } from 'react';
import { Coordinates } from '../types';


interface UserContextType {
  coordinates: Coordinates | null;
  loading: boolean;
  error: string | null;
  updateCoordinates: (coords: Coordinates) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocationError('No se pudo obtener tu ubicación. Por favor, verifica que has permitido el acceso a la ubicación en tu navegador.');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setLocationError('Tu navegador no soporta geolocalización');
      setLoading(false);
    }
  }, []);

  const updateCoordinates = (coords: Coordinates) => {
    setCoordinates(coords);
  };

  return (
    <UserContext.Provider 
      value={{ 
        coordinates, 
        loading, 
        locationError, 
        updateCoordinates 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};