import { ShoppingBag, X, Send } from 'lucide-react';
import { useTrip } from '../contexts/TripContext';
import { useState } from 'react';

interface TripCartProps {
  onCheckout: () => void;
}

export function TripCart({ onCheckout }: TripCartProps) {
  const { selectedLocations, removeLocation } = useTrip();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-[500] bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <ShoppingBag className="w-5 h-5" />
        <span className="font-medium">Мой маршрут</span>
        {selectedLocations.length > 0 && (
          <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
            {selectedLocations.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed top-20 right-4 z-[500] bg-white rounded-lg shadow-2xl w-96 max-h-[calc(100vh-6rem)] flex flex-col">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Выбранные локации</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {selectedLocations.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Выберите локации на карте</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedLocations.map((location, index) => (
                  <div
                    key={location.id}
                    className="bg-gray-50 rounded-lg p-3 flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 mb-1">{location.name}</h4>
                      <p className="text-sm text-gray-600">{location.city}</p>
                    </div>
                    <button
                      onClick={() => removeLocation(location.id)}
                      className="flex-shrink-0 p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedLocations.length > 0 && (
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onCheckout();
                }}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Оформить путешествие
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
