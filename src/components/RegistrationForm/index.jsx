import { registration } from "../../api/register";
import { useLogin } from "../../context/login-context";
import { userLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "../../context/theme-context"; // Import theme hook

export const Registration = () => {
  const navigate = useNavigate();
  const { loginDispatch, name, email, password, avatar } = useLogin();
  const [error, setError] = useState(null);
  const { darkMode } = useTheme(); // Get dark mode state

  const onFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = await registration(name, email, password, avatar);
      console.log(userData);

      // Auth login with the registered credentials
      const data = await userLogin(email, password);
      loginDispatch({
        type: "TOKEN",
        payload: {
          token: data,
        },
      });

      navigate("/");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again later.";
      setError(errorMessage);
    }
  };

  const onNameChange = (e) => {
    loginDispatch({
      type: "NAME",
      payload: {
        value: e.target.value,
      },
    });
  };

  const onEmailChange = (e) => {
    loginDispatch({
      type: "EMAIL",
      payload: {
        value: e.target.value,
      },
    });
  };

  const onPasswordChange = (e) => {
    loginDispatch({
      type: "PASSWORD",
      payload: {
        value: e.target.value,
      },
    });
  };

  return (
    <div
      className={`flex items-center justify-center min-h-[calc(100vh-64px)] p-4 sm:p-8 ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}
    >
      <form
        className={`shadow-md w-full max-w-[500px] mb-8 p-6 sm:p-8 rounded-lg ${
          darkMode ? "bg-gray-800 text-white" : "bg-zinc-100 text-gray-800"
        }`}
        onSubmit={onFormSubmit}
      >
        <h1 className="flex justify-center p-2 text-3xl sm:text-4xl mb-4 font-bold">
          Create Account
        </h1>

        {error && (
          <div
            className={`border-l-4 p-3 mb-4 rounded ${
              darkMode
                ? "bg-red-900/30 border-red-500 text-red-300"
                : "bg-red-100 border-red-500 text-red-700"
            }`}
          >
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Name *
            </label>
            <input
              name="name"
              className={`focus:outline-none rounded text-sm border-b p-2 px-1 w-full ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white placeholder-gray-400"
                  : "border-black hover:bg-gray-200"
              }`}
              onChange={onNameChange}
              type="text"
              placeholder="Your full name"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Email *
            </label>
            <input
              name="email"
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

          <div className="flex flex-col gap-1">
            <label className={darkMode ? "text-gray-300" : "text-gray-700"}>
              Password *
            </label>
            <input
              name="password"
              className={`focus:outline-none rounded text-sm border-b p-2 px-1 w-full ${
                darkMode
                  ? "bg-gray-700 border-gray-600 hover:bg-gray-600 text-white placeholder-gray-400"
                  : "border-black hover:bg-gray-200"
              }`}
              onChange={onPasswordChange}
              type="password"
              placeholder="Create a password"
              required
            />
          </div>
        </div>

        <div
          className={`text-center text-sm mb-6 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/login")}
            className={`px-1 underline hover:cursor-pointer ${
              darkMode ? "hover:text-blue-400" : "hover:text-sky-900"
            }`}
          >
            Sign in
          </span>
        </div>

        <div className="flex align-center justify-center mt-6">
          <button
            type="submit"
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              darkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-sky-900 hover:bg-sky-800 text-white"
            }`}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};
