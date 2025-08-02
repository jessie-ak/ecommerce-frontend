import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart-context";

export const HorizontalProductCard = ({ product, path, className }) => {
  const navigate = useNavigate();
  const { cartDispatch } = useCart();

  const onRemoveClick = (product) => {
    cartDispatch({
      type: path === '/cart' ? 'REMOVE_FROM_CART' : 'REMOVE_FROM_WISHLIST',
      payload: { id: product.id }
    });
  };

  const onMoveClick = (product) => {
    cartDispatch({
      type: path === '/cart' ? 'MOVE_TO_WISHLIST' : 'MOVE_TO_CART',
      payload: { product }
    });
  };

  const updateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    cartDispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: newQuantity }
    });
  };

  const onProductTitleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 ${className}`}>
      {/* Product Image */}
      <div 
        className="w-full sm:w-32 h-32 flex-shrink-0 cursor-pointer bg-white dark:bg-gray-800"
        onClick={onProductTitleClick}
      >
        <img 
          className="w-full h-full object-contain" 
          src={product.images[0]} 
          alt={product.title} 
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col gap-2">
        <h3 
          className="text-lg font-medium hover:underline cursor-pointer text-gray-900 dark:text-white"
          onClick={onProductTitleClick}
        >
          {product.title}
        </h3>
        
        <p className="text-lg font-bold text-gray-900 dark:text-white">
          Rs. {product.price * (product.quantity || 1)}
        </p>

        {/* Quantity Selector - Only in Cart */}
        {path === '/cart' && (
          <div className="flex items-center gap-4 mt-2">
            <p className="text-gray-600 dark:text-gray-400">Quantity:</p>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => updateQuantity((product.quantity || 1) - 1)}
              >
                <span className="dark:text-white">-</span>
              </button>
              <span className="w-8 text-center dark:text-white">{product.quantity || 1}</span>
              <button
                className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => updateQuantity((product.quantity || 1) + 1)}
              >
                <span className="dark:text-white">+</span>
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <button
            onClick={() => onRemoveClick(product)}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:opacity-85 transition-colors dark:bg-red-600 dark:hover:bg-red-700"
          >
            {path === '/cart' ? 'Remove' : 'Remove'}
          </button>
          <button
            onClick={() => onMoveClick(product)}
            className="px-4 py-2 border border-gray-900 text-gray-900 rounded-md hover:bg-blue-50 transition-colors dark:border-gray-300 dark:text-white dark:hover:bg-gray-700"
          >
            {path === '/cart' ? 'Move to Wishlist' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};