import { createContext, useContext, useReducer, useEffect } from "react";
import { loginReducer } from "../reducers/loginReducer";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const initialValue = {
    email: '',
    password: '',
    token: '',
    name: '',
    avatar: "https://picsum.photos/800"
  };

  // Keep the full state object instead of destructuring immediately
  const [state, loginDispatch] = useReducer(loginReducer, initialValue, () => {
    try {
      const localData = localStorage.getItem('loginState');
      return localData ? JSON.parse(localData) : initialValue;
    } catch (error) {
      console.error("Failed to parse login state", error);
      return initialValue;
    }
  });

  // Persist the complete state
  useEffect(() => {
    try {
      localStorage.setItem('loginState', JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save login state", error);
    }
  }, [state]);

  // Now destructure for the Provider value
  const { email, password, token, name, avatar } = state;

  return (
    <LoginContext.Provider value={{ email, password, token, name, avatar, loginDispatch }}>
      {children}
    </LoginContext.Provider>
  );
};

const useLogin = () => useContext(LoginContext);

export { LoginProvider, useLogin };