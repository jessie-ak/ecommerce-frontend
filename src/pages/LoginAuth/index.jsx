import { LoginForm } from "../../components/LoginForm"
import { Navbar } from "../../components/Navbar"

export const LoginAuth=()=>{
    return (
        <>
        <Navbar />
        <main className="flex justify-center align-center pt-8">
            <LoginForm />
        </main>
        
        </>
        
    )
}