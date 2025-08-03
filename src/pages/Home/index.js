import { Navbar } from "../../components/Navbar";
import { ProductCard } from "../../components/ProductCard";
import { Pagination } from "../../components/Pagination";
import { useEffect, useState, useRef, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProducts } from "../../api/getAllProducts";
import { getAllCategories } from "../../api/getAllCategories";
import { Sidebar } from "../../components/Sidebar";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [colors, setColors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchParams] = useSearchParams();

  // Pagination
  const itemsPerPage = 12;
  const currentPage = Number(searchParams.get("page")) || 1;
  const offset = (currentPage - 1) * itemsPerPage;

  // Current active filters
  const [activeFilters, setActiveFilters] = useState({
    minPrice: null,
    maxPrice: null,
    category: 'all',
    colors: [],
    searchQuery: ''
  });

  const sidebarRef = useRef(null);
  const contentRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    let filtered = products;
    
    if (activeFilters.searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(activeFilters.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())
      );
    }
    
    if (activeFilters.category && activeFilters.category !== 'all') {
      filtered = filtered.filter(p => p.category.id === activeFilters.category);
    }
    
     if (activeFilters.colors.length > 0) {
    filtered = filtered.filter(p => 
      activeFilters.colors.some(color => 
        p.title.toLowerCase().includes(color.toLowerCase())
      )
    );
  }
    
    filtered = filtered.filter(p => {
      return (activeFilters.minPrice === null || p.price >= activeFilters.minPrice) && 
             (activeFilters.maxPrice === null || p.price <= activeFilters.maxPrice);
    });

    return filtered;
  }, [products, activeFilters]);

  // Calculate category counts based on ALL products (not filtered)
  const categoriesWithCounts = useMemo(() => {
    if (!products.length) return [];
    
    const counts = {};
    products.forEach(product => {
      counts[product.category.id] = (counts[product.category.id] || 0) + 1;
    });
    
    return categories.map(category => ({
      ...category,
      count: category.id === 'all' ? products.length : counts[category.id] || 0
    }));
  }, [categories, products]);

  // Extract colors from product titles
  useEffect(() => {
    if (products.length > 0) {
      const colorKeywords = [
        'black', 'white', 'red', 'blue', 'green', 'yellow', 
        'purple', 'pink', 'orange', 'gray', 'grey', 'brown',
        'navy', 'beige', 'maroon', 'teal', 'olive', 'silver',
        'gold', 'cream', 'charcoal'
      ];
      
      const extractedColors = new Set();
      
      products.forEach(product => {
        const lowerTitle = product.title.toLowerCase();
        colorKeywords.forEach(color => {
          if (lowerTitle.includes(color)) {
            extractedColors.add(color);
          }
        });
      });

      setColors(Array.from(extractedColors).sort());
    }
  }, [products]);

  // Prevent scroll bleed between sidebar and content
  useEffect(() => {
    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      const isAtTop = scrollTop === 0;
      const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 1;

      if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
        e.preventDefault();
      }
    };

    const sidebar = sidebarRef.current;
    const content = contentRef.current;

    if (sidebar) sidebar.addEventListener('wheel', handleScroll);
    if (content) content.addEventListener('wheel', handleScroll);

    return () => {
      if (sidebar) sidebar.removeEventListener('wheel', handleScroll);
      if (content) content.removeEventListener('wheel', handleScroll);
    };
  }, []);

  // Load products and categories
  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    (async () => {
      try {
        const [products, categorys] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);
        setProducts(products);
        setCategories([{ id: "all", name: "All" }, ...categorys]);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    })();
    
    return () => clearTimeout(timerId);
  }, []);

  // Update filters when search query changes (debounced)
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setSearchQuery(searchInput);
      setActiveFilters(prev => ({
        ...prev,
        searchQuery: searchInput
      }));
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchInput]);

  const resetFilters = () => {
    setSearchInput('');
    setSearchQuery('');
    setActiveFilters({
      minPrice: null,
      maxPrice: null,
      category: 'all',
      colors: [],
      searchQuery: ''
    });
  };

  const handleCategoryClick = (categoryId) => {
    setSearchInput('');
    setSearchQuery('');
    setActiveFilters(prev => ({
      ...prev,
      category: categoryId,
      searchQuery: ''
    }));
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  // Get paginated products (now used directly in render)
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(offset, offset + itemsPerPage);
  }, [filteredProducts, offset]);

  return (
    <div className={`h-screen flex flex-col bg-gray-50 dark:bg-gray-900 overflow-hidden`}>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-800">
          <img
            src={`${process.env.PUBLIC_URL}/images/Ecommerce_logo.png`}

            alt="Loading..."
            className="w-32 h-32 sm:w-52 sm:h-52 object-contain animate-pulse"
          />
        </div>
      ) : (
        <div className="flex flex-1 pt-20 overflow-hidden">
          {/* Desktop Sidebar */}
          <aside 
            ref={sidebarRef}
            className="hidden lg:block w-72 h-full overflow-y-auto border-r bg-white dark:bg-gray-800 dark:border-gray-700"
          >
            <Sidebar
              onApplyFilterClick={(filters) => setActiveFilters(prev => ({ ...prev, ...filters }))}
              onResetFilters={resetFilters}
              categories={categoriesWithCounts}
              colors={colors}
              isMobile={false}
              activeFilters={activeFilters}
            />
          </aside>

          {/* Main Content Area */}
          <main 
            ref={contentRef}
            className="flex-1 h-full overflow-y-auto dark:bg-gray-900"
          >
            {/* Mobile Filter Button */}
            <div className="lg:hidden fixed bottom-6 right-6 z-30">
              <button 
                onClick={() => setShowMobileFilters(true)}
                className="bg-gray-900 dark:bg-gray-700 text-white p-4 rounded-full shadow-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                aria-label="Open filters"
              >
                <span className="material-symbols-outlined text-xl">
                  filter_alt
                </span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="px-6 pt-6">
              <div className="relative max-w-xl mx-auto mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 border-b-2 border-gray-900 dark:border-gray-300 rounded-sm focus:border-none dark:bg-gray-800 dark:text-white"
                />
                {searchInput && (
                  <button
                    onClick={() => {
                      setSearchInput('');
                      setSearchQuery('');
                      setActiveFilters(prev => ({ ...prev, searchQuery: '' }));
                    }}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Category Chips - Only show when not searching */}
            {/* Category Chips - Only show when not searching */}
{!searchQuery && (
  <div className="hidden lg:block px-6 pt-2">
    <div className="flex overflow-x-auto gap-2 pb-2 
        [-ms-overflow-style:none] [scrollbar-width:none] 
        [&::-webkit-scrollbar]:hidden">
      {categoriesWithCounts.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium ${
            activeFilters.category === category.id
              ? "bg-gray-900 dark:bg-gray-700 text-white"
              : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  </div>
)}

            {/* Product Grid */}
            <div className="p-4 sm:px-6 sm:pt-6">
              {filteredProducts.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                    {visibleProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        className="w-full"
                      />
                    ))}
                  </div>
                  
                  {/* Pagination */}
                  <div className="mt-8">
                    <Pagination 
                      totalItems={filteredProducts.length} 
                      itemsPerPage={itemsPerPage}
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                    {searchQuery ? 'No products match your search' : 'No products match your filters'}
                  </p>
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* Mobile Sidebar Overlay */}
          {showMobileFilters && (
            <>
              <div 
                className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={() => setShowMobileFilters(false)}
              />
              <aside className="lg:hidden fixed inset-y-0 left-0 w-72 bg-white dark:bg-gray-800 z-50 shadow-xl overflow-y-auto">
                <Sidebar
                  onApplyFilterClick={(filters) => {
                    setActiveFilters(prev => ({ ...prev, ...filters }));
                    setShowMobileFilters(false);
                  }}
                  onClose={() => setShowMobileFilters(false)}
                  onResetFilters={resetFilters}
                  categories={categoriesWithCounts}
                  colors={colors}
                  isMobile={true}
                  activeFilters={activeFilters}
                />
              </aside>
            </>
          )}
        </div>
      )}
    </div>
  );
};