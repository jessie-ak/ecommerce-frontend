import { LoginForm } from "../../components/LoginForm"
import { Navbar } from "../../components/Navbar"
import { useTheme } from "../../context/theme-context"

export const LoginAuth=()=>{
     const { darkMode } = useTheme(); // Get dark mode state

  return (
    <div className={darkMode ? "dark" : ""}> {/* Ensure dark mode class is applied */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className={`flex justify-center align-center pt-20 min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}>
        <LoginForm />
      </main>
    </div>
  );
}