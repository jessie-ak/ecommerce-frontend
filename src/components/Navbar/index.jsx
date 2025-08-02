import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login-context";
import { useTheme } from "../../context/theme-context";
export const Navbar = () => {
  const navigate = useNavigate();
  const { token, loginDispatch } = useLogin();
  
  const onLoginClick = () => {
    if (token?.access_token) {
      loginDispatch({
        type: 'LOGOUT',
      });
    } else {
      navigate('/auth/login');
    }
  };
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className={`flex px-5 py-4 rounded-sm bg-gray-900 dark:bg-gray-800 text-slate-500 dark:text-gray-300`}>
      <div onClick={() => navigate('/')} className="flex items-center gap-2 hover:cursor-pointer">
        <span>
          <img
            src="/images/Ecommerce_logo.png"
            alt="ecomlogo"
            className="w-12 h-12 object-contain opacity-75 dark:opacity-90" 
          />
        </span>
        <h1 className="text-slate-50 dark:text-white font-semibold hover:cursor-pointer text-3xl">DAINIKI</h1>
      </div>
      
      <nav className="ml-auto text-slate-50 dark:text-gray-300 flex align-center gap-5">
        
        <div
              onClick={toggleDarkMode}
              className={`w-8 h-8 text-center hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer rounded-md flex items-center justify-center ${
                darkMode ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              {darkMode ? (
                <span className="text-yellow-400 text-sm">☀️</span>
              ) : (
                <span className="text-gray-600 text-lg">🌙</span>
              )}
            </div>
        <span 
          onClick={() => navigate('/wishlist')} 
          className="material-symbols-outlined hover:cursor-pointer text-3xl hover:text-gray-300 dark:hover:text-white"
        >
          favorite
        </span>
        
        <span 
          onClick={() => navigate('/cart')} 
          className="material-symbols-outlined hover:cursor-pointer text-3xl hover:text-gray-300 dark:hover:text-white"
        >
          shopping_cart
        </span>
        
        <div className="group">
          <span className="material-symbols-outlined hover:cursor-pointer text-3xl hover:text-gray-300 dark:hover:text-white">
            person
          </span>
          <div className="hidden group-hover:flex absolute right-0 mt-0 p-1 bg-slate-50 dark:bg-gray-700 shadow-lg border-1 dark:border-gray-600 z-50 flex-col justify-center items-center text-gray-900 dark:text-white">
            <button 
              className="hover:text-gray-500 dark:hover:text-gray-300 w-full px-4 py-2 text-left"
              onClick={onLoginClick}
            >
              {token?.access_token ? 'Logout' : 'Login'}
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