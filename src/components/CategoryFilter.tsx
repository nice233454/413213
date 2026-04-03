import type { Category } from '../lib/database.types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="font-bold text-lg mb-4 text-gray-900">Категории</h3>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategoryId === null
              ? 'bg-blue-100 text-blue-800 font-medium'
              : 'hover:bg-gray-100 text-gray-700'
          }`}
        >
          Все категории
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              selectedCategoryId === category.id
                ? 'font-medium'
                : 'hover:bg-gray-50 text-gray-700'
            }`}
            style={{
              backgroundColor: selectedCategoryId === category.id ? `${category.color}20` : undefined,
              color: selectedCategoryId === category.id ? category.color : undefined,
            }}
          >
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: category.color }}
            />
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
