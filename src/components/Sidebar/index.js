import { useState } from "react";

export const Sidebar = ({
  onApplyFilterClick,
  onClose,
  onResetFilters,
  categories,
  colors,
  isMobile,
}) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColors, setSelectedColors] = useState([]);

  const handleApplyFilters = () => {
    onApplyFilterClick({
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      category: selectedCategory,
      colors: selectedColors.length > 0 ? selectedColors : null,
    });
    if (onClose) onClose();
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("all");
    setSelectedColors([]);
    onResetFilters();
    if (onClose) onClose();
  };

  const toggleColorSelection = (color) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  return (
    <div className={`flex flex-col bg-white dark:bg-gray-800 ${
      isMobile ? "h-full shadow-xl" : "border-r dark:border-gray-700"
    }`}>
      {/* Mobile Header */}
      {isMobile && (
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
            Filters
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Close filters"
          >
            <span className="material-symbols-outlined dark:text-white">
              close
            </span>
          </button>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Categories Section */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
            Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedCategory === category.id
                    ? "bg-gray-900 text-white dark:bg-blue-600"
                    : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                }`}
              >
                {category.name} ({Math.floor(Math.random() * 50)})
              </button>
            ))}
          </div>
        </div>

        {/* Colors Section */}
        {colors.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
              Colors {selectedColors.length > 0 && `(${selectedColors.length} selected)`}
            </h3>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => toggleColorSelection(color)}
                  className={`px-3 py-1 rounded-full text-sm capitalize flex items-center ${
                    selectedColors.includes(color)
                      ? "bg-gray-900 text-white dark:bg-blue-600"
                      : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
                  }`}
                >
                  {color}
                  {selectedColors.includes(color) && (
                    <span className="ml-1 text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Filter Section - Restored */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
            Price Range
          </h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Min (Rs.)
              </label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Max (Rs.)
              </label>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleApplyFilters}
              className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-md hover:opacity-80 transition-colors duration-200 flex items-center justify-center gap-2 dark:bg-blue-600"
            >
              Apply filters
            </button>
            <button
              onClick={handleResetFilters}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center gap-2 dark:bg-gray-600 dark:text-white"
            >
              Reset filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};