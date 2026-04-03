import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon, LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { LocationWithCategory } from '../lib/database.types';
import { useEffect } from 'react';

const belarusCenter: [number, number] = [53.9, 27.56667];
const belarusBounds: [[number, number], [number, number]] = [
  [51.2, 23.2],
  [56.2, 32.8],
];

function MapBounds() {
  const map = useMap();

  useEffect(() => {
    const bounds = new LatLngBounds(belarusBounds[0], belarusBounds[1]);
    map.setMaxBounds(bounds);
    map.fitBounds(bounds);
  }, [map]);

  return null;
}

interface MapProps {
  locations: LocationWithCategory[];
  onLocationClick: (location: LocationWithCategory) => void;
  selectedCategoryId?: string | null;
}

export function Map({ locations, onLocationClick, selectedCategoryId }: MapProps) {
  const filteredLocations = selectedCategoryId
    ? locations.filter((loc) => loc.category_id === selectedCategoryId)
    : locations;

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={belarusCenter}
        zoom={7}
        className="h-full w-full"
        minZoom={7}
        maxZoom={15}
        scrollWheelZoom={true}
      >
        <MapBounds />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredLocations.map((location) => {
          const markerIcon = new Icon({
            iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${
              location.category?.color.replace('#', '') || 'blue'
            }.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
          });

          return (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude]}
              icon={markerIcon}
              eventHandlers={{
                click: () => onLocationClick(location),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-lg mb-1">{location.name}</h3>
                  {location.city && (
                    <p className="text-sm text-gray-600 mb-2">{location.city}</p>
                  )}
                  <p className="text-sm">{location.short_description}</p>
                  <button
                    onClick={() => onLocationClick(location)}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Подробнее →
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
