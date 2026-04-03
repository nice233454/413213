import { createContext, useContext, useState, ReactNode } from 'react';
import type { Location } from '../lib/database.types';

interface TripContextType {
  selectedLocations: Location[];
  addLocation: (location: Location) => void;
  removeLocation: (locationId: string) => void;
  clearTrip: () => void;
  isInTrip: (locationId: string) => boolean;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);

  const addLocation = (location: Location) => {
    setSelectedLocations((prev) => {
      if (prev.find((loc) => loc.id === location.id)) {
        return prev;
      }
      return [...prev, location];
    });
  };

  const removeLocation = (locationId: string) => {
    setSelectedLocations((prev) => prev.filter((loc) => loc.id !== locationId));
  };

  const clearTrip = () => {
    setSelectedLocations([]);
  };

  const isInTrip = (locationId: string) => {
    return selectedLocations.some((loc) => loc.id === locationId);
  };

  return (
    <TripContext.Provider
      value={{
        selectedLocations,
        addLocation,
        removeLocation,
        clearTrip,
        isInTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
