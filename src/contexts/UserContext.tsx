import React, { createContext, useContext, useState, useEffect } from 'react';

interface Coordinates {
  latitude: number;
  longitude: number;
}

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
  const [error, setError] = useState<string | null>(null);

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
          setError('No se pudo obtener tu ubicación. Por favor, verifica que has permitido el acceso a la ubicación en tu navegador.');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError('Tu navegador no soporta geolocalización');
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
        error, 
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