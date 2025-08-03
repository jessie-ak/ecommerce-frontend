import { useLogin } from "../../context/login-context";
import { userLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../context/theme-context"; // Import theme hook

export const LoginForm = () => {
  const { loginDispatch, email, password } = useLogin();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { darkMode } = useTheme(); // Get dark mode state
  
  const onFormSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      const response = await userLogin(email, password);
      
      if (response.error) {
        setError(response.error.message || "Invalid email or password");
        return;
      }

      if (!response.access_token) {
        setError("Login failed. Please try again.");
        return;
      }

      loginDispatch({
        type: 'TOKEN',
        payload: {
          token: response
        }
      });

      navigate('/');
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          "Login failed. Please try again later.";
      setError(errorMessage);
    }
  };

  const onEmailChange = (e) => {
    loginDispatch({
      type: "EMAIL",
      payload: {
        value: e.target.value
      }
    });
  };

  const onPasswordChange = (e) => {
    loginDispatch({
      type: "PASSWORD",
      payload: {
        value: e.target.value
      }
    });
  };

  return (
    <div className={`flex items-center justify-center min-h-[calc(100vh-64px)] p-4 ${
      darkMode ? "bg-gray-900" : "bg-white"
    }`}>
      <form 
        className={`shadow-md w-full max-w-[400px] mb-8 p-6 rounded-lg ${
          darkMode 
            ? "bg-gray-800 text-white" 
            : "bg-zinc-100 text-gray-800"
        }`}
        onSubmit={onFormSubmit}
      >
        <h1 className="flex justify-center p-2 text-3xl font-bold">Login</h1>
        
        {error && (
          <div className={`border-l-4 p-2 mx-2 mb-4 rounded ${
            darkMode
              ? "bg-red-900/30 border-red-500 text-red-300"
              : "bg-red-100 border-red-500 text-red-700"
          }`}>
            <p className="font-light">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-2 p-2">
          <label className={darkMode ? "text-gray-300" : "text-gray-700"}>Email *</label>
          <input 
            className={`focus:outline-none rounded text-sm border-b p-2 px-1 w-full ${
              darkMode
                ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white placeholder-gray-400"
                : "border-black hover:bg-gray-200"
            }`}
            onChange={onEmailChange}
            type="email"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="flex flex-col gap-2 p-2">
          <label className={darkMode ? "text-gray-300" : "text-gray-700"}>Password *</label>
          <input 
            className={`focus:outline-none rounded text-sm border-b p-2 px-1 w-full ${
              darkMode
                ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white placeholder-gray-400"
                : "border-black hover:bg-gray-200"
            }`}
            onChange={onPasswordChange}
            type="password"
            placeholder="password"
            required
          />
        </div>

        <div className={`text-sm flex justify-center align-center mt-4 ${
          darkMode ? "text-gray-400" : "text-gray-600"
        }`}>
          Don't have an account?{' '}
          <span 
            onClick={() => navigate('/auth/register/user')}
            className={`px-1 underline hover:cursor-pointer ${
              darkMode ? "hover:text-blue-400" : "hover:text-sky-900"
            }`}
          >
            Register here.
          </span>
        </div>

        <div className="flex align-center justify-center mt-6">
          <button 
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-sky-900 hover:bg-sky-800 text-white"
            }`}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};