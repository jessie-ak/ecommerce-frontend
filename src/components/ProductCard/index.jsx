import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";
import { useNavigate } from "react-router-dom";
import { findProductInWishList } from "../../utils/findProductInWishList";
import { useState, useEffect } from "react";
import { useTheme } from "../../context/theme-context"; // Import theme hook

export const ProductCard = ({ product }) => {
  const { cart, wishlist, cartDispatch } = useCart();
  const isProductInCart = findProductInCart(cart, product.id);
  const isProductInWishlist = findProductInWishList(wishlist, product.id);
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isManualSelection, setIsManualSelection] = useState(false);
  const { darkMode } = useTheme(); // Get dark mode state

  // Auto-rotate images on hover if multiple images exist
  useEffect(() => {
    let interval;
    if (isHovering && product.images.length > 1 && !isManualSelection) {
      setCurrentImageIndex(prev => (prev + 1) % product.images.length);
      interval = setInterval(() => {
        setCurrentImageIndex(prev => prev < product.images.length-1 ? prev+1 : 0);
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isHovering, product.images, isManualSelection]);

  const onCartClick = (e, product) => {
    e.stopPropagation();
    !isProductInCart
      ? cartDispatch({ type: "ADD_TO_CART", payload: { product } })
      : navigate("/cart");
  };

  const onWishlistClick = (e, product) => {
    e.stopPropagation();
    !isProductInWishlist
      ? cartDispatch({ type: "ADD_TO_WISHLIST", payload: { product } })
      : navigate("/wishlist");
  };

  const onProductTitleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 ${
        darkMode ? 'shadow-gray-900/20' : ''
      }`}
      onMouseEnter={() => { setIsHovering(true); setIsManualSelection(false); }}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image Container */}
      <div 
        className="relative aspect-square overflow-hidden cursor-pointer"
        onClick={onProductTitleClick}
      >
        {/* Image Slideshow */}
        <div 
          className="flex h-full transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
        >
          {product.images.map((img, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`${product.title} view ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Image Indicator Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsManualSelection(true);
                  setCurrentImageIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentImageIndex === index 
                    ? 'bg-gray-800 dark:bg-gray-300 scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        <h3 
          onClick={onProductTitleClick}
          className="text-sm sm:text-base font-medium mb-1 line-clamp-2 hover:underline cursor-pointer dark:text-white"
        >
          {product.title}
        </h3>
        <p className="text-gray-900 dark:text-gray-200 font-semibold text-sm sm:text-base mb-2">
          Rs.{product.price}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={(e) => onCartClick(e, product)}
            className={`flex-1 flex items-center justify-center gap-1 py-1 px-2 rounded text-xs sm:text-sm transition-colors ${
              isProductInCart
                ? 'bg-gray-900 dark:bg-gray-700 text-white dark:border-gray-600 text-blue-600 dark:text-blue-600 hover:opacity-80 dark:hover:bg-gray-600'
                : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 '
            }`}
          >
            <span className="material-symbols-outlined text-sm sm:text-base ">
              {isProductInCart ? "shopping_cart_checkout" : "shopping_cart"}
            </span>
            <span className="text-white dark:text-white">{isProductInCart ? "Cart" : "Add"}</span>
          </button>
          <button
            onClick={(e) => onWishlistClick(e, product)}
            className={`flex-1 flex items-center justify-center gap-1  py-1 px-2 rounded text-xs sm:text-sm transition-colors ${
              isProductInWishlist
                ? 'bg-red-50 dark:bg-gray-700 border-red-200 dark:border-gray-600 text-red-600 dark:text-red-600 hover:bg-red-100 dark:hover:bg-gray-600'
                : 'bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-700 dark:hover:bg-gray-600 '
            }`}
          >
            <span className="material-symbols-outlined text-sm sm:text-base">
              {isProductInWishlist ? "heart_check" : "favorite"}
            </span>
            <span className={isProductInWishlist ? 'text-red-600 dark:text-white' : 'dark:text-gray-300'}>
              {isProductInWishlist ? "Saved" : "Save"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};