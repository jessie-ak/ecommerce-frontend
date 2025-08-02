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
  const [selectedColor, setSelectedColor] = useState(null);


  const handleApplyFilters = () => {
    onApplyFilterClick({
      minPrice: minPrice || null,
      maxPrice: maxPrice || null,
      category: selectedCategory,
      color: selectedColor,
    });
    if (onClose) onClose();
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedCategory("all");
    setSelectedColor(null);
    onResetFilters();
    if (onClose) onClose();
  };

  return (
    <div
      className={`flex flex-col bg-white dark:bg-gray-800 ${
        isMobile ? "h-full shadow-xl" : "border-r dark:border-gray-700"
      }`}
    >
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
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-gray-100 dark:bg-gray-700 font-medium"
                      : ""
                  }`}
                >
                  <span className="flex-1 dark:text-gray-200">
                    {category.name}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm">
                    ({Math.floor(Math.random() * 50)})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Rest of your existing code remains the same, just add dark mode classes */}
        {colors.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 dark:text-white">
              Colors
            </h3>
            <div className="space-y-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() =>
                    setSelectedColor(selectedColor === color ? null : color)
                  }
                  className={`w-full text-left py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-2 ${
                    selectedColor === color
                      ? "bg-gray-100 dark:bg-gray-700 font-medium"
                      : ""
                  }`}
                >
                  <span className="flex-1 capitalize dark:text-gray-200">
                    {color}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Price Filter */}
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
