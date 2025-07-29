import {useLogin} from "../../context/login-context";
import { userLogin } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export const LoginForm =()=>{

    const {loginDispatch, email, password} = useLogin();
    const navigate=useNavigate();
    
    const onFormSubmit = async (event) => {
        event.preventDefault();
        const data =await userLogin(email, password);
        
        loginDispatch({
            type:'TOKEN',
            payload:{
                token: data
            }
        })
        if (data.access_token){
            navigate('/')
        }
    };

    const onEmailChange=(e)=>{
        loginDispatch({
            type:"EMAIL",
            payload:{
                value: e.target.value
            }
        })
    }

    const onPasswordChange=(e)=>{
        loginDispatch({
            type:"PASSWORD",
            payload:{
                value: e.target.value
            }
        })
    }

    return (
        <>
        <form className="bg-zinc-100 shadow-md  w-[400px] mb-8" onSubmit={onFormSubmit} >
            <h1 className="flex justify-center  p-2 text-3xl">Login</h1>
            <div className="flex flex-col gap-2 p-2 ">
                <label>Email *</label>
                <input className="focus:outline-none text-sm border-black border-b p-2 hover:bg-gray-200  px-1" onChange={onEmailChange} type='email' placeholder="your@email.com" required />
            </div>
            <div className="flex flex-col gap-2 p-2 ">
                <label>Password *</label>
                <input className=" focus:outline-none  text-sm border-black border-b p-2 hover:bg-gray-200 px-1" onChange={onPasswordChange} type='password' placeholder="password" required />
            </div>
            <div className="flex  align-center justify-center">
                <button 
                className="button btn-primary w-[200px]  mt-2 mb-2 hover:bg-sky-900 ">
                Login </button>
            </div>
            
            </form>
        </>
    )
}