import { useSearchParams } from "react-router-dom";
import { useTheme } from "../../context/theme-context";

export const Pagination = ({ totalItems, itemsPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const { darkMode } = useTheme();

  // Show limited page numbers (e.g., 1 2 3 ... 10)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    // Always show first page
    pages.push(1);
    
    // Show ellipsis if current page is far from start
    if (currentPage > maxVisiblePages - 1) {
      pages.push('...');
    }
    
    // Calculate range of pages to show around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    // Show ellipsis if current page is far from end
    if (currentPage < totalPages - (maxVisiblePages - 2)) {
      pages.push('...');
    }
    
    // Always show last page if different from first
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handlePageChange = (page) => {
    if (page === '...' || page === currentPage) return;
    searchParams.set("page", page);
    setSearchParams(searchParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-1 mt-8 flex-wrap">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? darkMode
              ? "bg-gray-700 text-white cursor-not-allowed"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
            : darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        &lt;
      </button>

      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded-md min-w-[40px] ${
            page === '...'
              ? darkMode
          ? "cursor-default text-white"  // Only add text-white for dark mode ellipsis
          : "cursor-default"
              : page === currentPage
              ? "bg-blue-500 text-white"
              : darkMode
              ? "bg-gray-700 hover:bg-gray-600"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? darkMode
              ? "bg-gray-700 text-white cursor-not-allowed"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
            : darkMode
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        &gt;
      </button>
    </div>
  );
};