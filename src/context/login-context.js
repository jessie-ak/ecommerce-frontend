import { createContext, useContext, useReducer } from "react";
import {loginReducer} from "../reducers/loginReducer";
const LoginContext = createContext();

const LoginProvider = ({children})=>{

    const initialValue={
        email:'',
        password:'',
        token:''
    }
    const [{email, password, token}, loginDispatch] = useReducer(loginReducer, initialValue)

    return (
        <LoginContext.Provider value={{email, password, token, loginDispatch}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLogin = ()=> useContext(LoginContext);

export  {LoginProvider, useLogin};