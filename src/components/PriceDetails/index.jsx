import { useCart } from "../../context/cart-context";
import { getTotalCartAmount } from "../../utils/getTotalCartAmount";
import { getTotalWishlistAmount } from "../../utils/getTotalWishlistAmount";
import { useTheme } from "../../context/theme-context"; // Import theme hook

export const PriceDetails = ({ path }) => {
  const { cart, wishlist, cartDispatch } = useCart();
  const { darkMode } = useTheme(); // Get dark mode state
  const totalCartAmount = getTotalCartAmount(cart || []);
  const totalWishlistAmount = getTotalWishlistAmount(wishlist || []);
  const deliveryCharge = 49;
  const TotalPrice = path === '/cart' ? totalCartAmount : totalWishlistAmount;
  const itemCount = path === '/cart' ? cart.length : wishlist.length;

  const onClearSelectedItemsClick = () => {
    if (path === '/cart') {
      cartDispatch({ type: 'CLEAR_CART' });
    } else {
      cartDispatch({ type: 'CLEAR_WISHLIST' });
    }
  };

  return (
    <div className={`w-full sm:w-80 rounded-lg shadow-sm p-4 md:p-6 border ${
      darkMode 
        ? "bg-gray-800 border-gray-700 text-white" 
        : "bg-white border-gray-200"
    }`}>
      <h3 className={`text-xl font-bold pb-3 border-b ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}>
        Price Details
      </h3>
      
      <div className={`space-y-3 py-4 border-b ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}>
        <div className="flex justify-between">
          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Price ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </span>
          <span className="font-medium">Rs. {TotalPrice}</span>
        </div>
        
        <div className="flex justify-between">
          <span className={darkMode ? "text-gray-300" : "text-gray-600"}>
            Delivery Charge
          </span>
          <span className="font-medium">Rs. {deliveryCharge}</span>
        </div>
      </div>
      
      <div className={`flex justify-between py-4 border-b ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}>
        <span className="font-bold">Total Amount</span>
        <span className="font-bold text-lg">Rs. {TotalPrice + deliveryCharge}</span>
      </div>
      
      <div className="pt-4 space-y-3">
        {path === '/cart' && (
          <button
            className={`w-full py-2 rounded-md transition-colors ${
              darkMode 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-gray-900 hover:opacity-80 text-white"
            }`}
          >
            Proceed to Checkout
          </button>
        )}
        
        <button
          onClick={onClearSelectedItemsClick}
          className={`w-full py-2 rounded-md transition-colors border ${
            darkMode
              ? "border-gray-600 hover:bg-gray-700 text-white"
              : "border-gray-900 hover:opacity-80 text-gray-900"
          }`}
        >
          Clear {path === '/cart' ? 'Cart' : 'Wishlist'}
        </button>
      </div>
      
      {path === '/cart' && (
        <p className={`text-sm mt-3 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          You will save Rs. {deliveryCharge} on first order
        </p>
      )}
    </div>
  );
};