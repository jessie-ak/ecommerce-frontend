import { Navbar } from "../../components/Navbar"
import { Registration } from "../../components/RegistrationForm"
import { useTheme } from "../../context/theme-context"

export const UserRegistration =()=>{
    const { darkMode } = useTheme(); // Get dark mode state

  return (
    <div className={darkMode ? "dark" : ""}> {/* Ensures dark mode classes work */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <main className={`flex justify-center items-center pt-20 min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-white"
      }`}>
        <Registration />
      </main>
    </div>
  );
}