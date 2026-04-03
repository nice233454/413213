import { useState } from 'react';
import { Map } from '../components/Map';
import { CategoryFilter } from '../components/CategoryFilter';
import { LocationModal } from '../components/LocationModal';
import { TripCart } from '../components/TripCart';
import { OrderForm } from '../components/OrderForm';
import { useLocations } from '../hooks/useLocations';
import { useCategories } from '../hooks/useCategories';
import type { LocationWithCategory } from '../lib/database.types';

export function MainPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationWithCategory | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);

  const { locations, loading: locationsLoading } = useLocations(selectedCategoryId);
  const { categories, loading: categoriesLoading } = useCategories();

  if (locationsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка карты...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-gray-900">Туризм в Беларуси</h1>
          <p className="text-gray-600 mt-1">Исследуйте удивительные места Республики Беларусь</p>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-80 bg-gray-50 p-4 overflow-y-auto">
          <CategoryFilter
            categories={categories}
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={setSelectedCategoryId}
          />

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Как использовать карту:</h4>
            <ol className="text-sm text-blue-800 space-y-2">
              <li>1. Выберите категорию или просмотрите все локации</li>
              <li>2. Нажмите на маркер для просмотра деталей</li>
              <li>3. Добавьте интересные места в маршрут</li>
              <li>4. Оформите путешествие через корзину</li>
            </ol>
          </div>
        </aside>

        <main className="flex-1">
          <Map
            locations={locations}
            onLocationClick={setSelectedLocation}
            selectedCategoryId={selectedCategoryId}
          />
        </main>
      </div>

      <TripCart onCheckout={() => setShowOrderForm(true)} />

      {selectedLocation && (
        <LocationModal location={selectedLocation} onClose={() => setSelectedLocation(null)} />
      )}

      {showOrderForm && <OrderForm onClose={() => setShowOrderForm(false)} />}
    </div>
  );
}
