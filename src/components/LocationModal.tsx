import { X, MapPin, Plus, Check } from 'lucide-react';
import type { LocationWithCategory } from '../lib/database.types';
import { useTrip } from '../contexts/TripContext';
import { useState } from 'react';

interface LocationModalProps {
  location: LocationWithCategory;
  onClose: () => void;
}

export function LocationModal({ location, onClose }: LocationModalProps) {
  const { addLocation, isInTrip } = useTrip();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const inTrip = isInTrip(location.id);

  const handleAddToTrip = () => {
    addLocation(location);
  };

  const nextImage = () => {
    if (location.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % location.images.length);
    }
  };

  const prevImage = () => {
    if (location.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + location.images.length) % location.images.length);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{location.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {location.images.length > 0 && (
            <div className="relative mb-6 group">
              <img
                src={location.images[currentImageIndex]}
                alt={location.name}
                className="w-full h-96 object-cover rounded-lg"
              />
              {location.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    →
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {location.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          idx === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="w-5 h-5" />
            <span>
              {location.city}
              {location.region && `, ${location.region}`}
            </span>
            {location.category && (
              <span
                className="px-3 py-1 rounded-full text-sm font-medium ml-auto"
                style={{ backgroundColor: `${location.category.color}20`, color: location.category.color }}
              >
                {location.category.name}
              </span>
            )}
          </div>

          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 whitespace-pre-wrap">{location.description}</p>
          </div>

          <button
            onClick={handleAddToTrip}
            disabled={inTrip}
            className={`w-full py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
              inTrip
                ? 'bg-green-100 text-green-800 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {inTrip ? (
              <>
                <Check className="w-5 h-5" />
                Добавлено в путешествие
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Добавить в путешествие
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
