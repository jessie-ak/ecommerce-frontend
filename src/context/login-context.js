import { createContext, useContext, useReducer } from "react";
import {loginReducer} from "../reducers/loginReducer";
const LoginContext = createContext();

const LoginProvider = ({children})=>{

    const initialValue={
        email:'',
        password:'',
        token:'',
        name:'',
        avatar: "https://picsum.photos/800"
    }
    const [{email, password, token, name, avatar}, loginDispatch] = useReducer(loginReducer, initialValue)

    return (
        <LoginContext.Provider value={{email, password, token, name,avatar, loginDispatch}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLogin = ()=> useContext(LoginContext);

export  {LoginProvider, useLogin};