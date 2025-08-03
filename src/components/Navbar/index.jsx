import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login-context";
import { useTheme } from "../../context/theme-context";
import { useCart } from "../../context/cart-context";

export const Navbar = () => {
  const navigate = useNavigate();
  const { cart, wishlist } = useCart();
  const { token, loginDispatch } = useLogin();
  const { darkMode, toggleDarkMode } = useTheme();

  const onLoginClick = () => {
    if (token?.access_token) {
      loginDispatch({
        type: "LOGOUT",
      });
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <header className="flex px-4 sm:px-5 py-3 sm:py-4 rounded-sm bg-gray-900 dark:bg-gray-800 text-slate-500 dark:text-gray-300">
      {/* Logo and Brand Name */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 hover:cursor-pointer"
      >
        <span>
          <img
            src={`${process.env.PUBLIC_URL}/images/Ecommerce_logo.png`}
            alt="ecomlogo"
            className="w-12 h-12 object-contain opacity-75 dark:opacity-90"
          />
        </span>
        <h1 className="text-slate-50 dark:text-white font-semibold hover:cursor-pointer text-3xl">
          DAINIKI
        </h1>
      </div>

      {/* Navigation Icons */}
      <nav className="ml-auto text-slate-50 dark:text-gray-300 flex items-center gap-3 sm:gap-5">
        {/* Dark Mode Toggle */}
        <div
          onClick={toggleDarkMode}
          className={`w-7 h-7 sm:w-8 sm:h-8 text-center hover:bg-gray-700 dark:hover:bg-gray-700 hover:cursor-pointer rounded-md flex items-center justify-center ${
            darkMode ? "bg-gray-100 dark:bg-gray-700" : ""
          }`}
        >
          {darkMode ? (
            <span className="text-yellow-400 text-sm">🌔</span>
          ) : (
            <span className="text-gray-600 text-base">🌒</span>
          )}
        </div>

        {/* Wishlist Icon with Badge */}
        <div className="relative">
          <span
            onClick={() => navigate("/wishlist")}
            className="material-symbols-outlined hover:cursor-pointer text-2xl sm:text-3xl hover:text-gray-300 dark:hover:text-white"
          >
            favorite
          </span>
          {wishlist.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
              {wishlist.length > 9 ? "9+" : wishlist.length}
            </span>
          )}
        </div>

        {/* Cart Icon with Badge */}
        <div className="relative">
          <span
            onClick={() => navigate("/cart")}
            className="material-symbols-outlined hover:cursor-pointer text-2xl sm:text-3xl hover:text-gray-300 dark:hover:text-white"
          >
            shopping_cart
          </span>
          {cart.length > 0 && (
            <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
              {cart.length > 9 ? "9+" : cart.length}
            </span>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="group">
          <span className="material-symbols-outlined hover:cursor-pointer text-2xl sm:text-3xl hover:text-gray-300 dark:hover:text-white">
            person
          </span>
          <div className="hidden group-hover:flex absolute right-0 mt-0 p-1 bg-slate-50 dark:bg-gray-700 shadow-lg border-1 dark:border-gray-600 z-50 flex-col justify-center items-center text-gray-900 dark:text-white">
            <button
              className="hover:text-gray-500 dark:hover:text-gray-300 w-full px-4 py-2 text-left"
              onClick={onLoginClick}
            >
              {token?.access_token ? "Logout" : "Login"}
            </button>
            <button className="hover:text-gray-500 dark:hover:text-gray-300 w-full px-4 py-2 text-left">
              Merchant
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};