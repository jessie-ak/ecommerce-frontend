import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login-context";

export const Navbar = () => {

    const navigate = useNavigate();
    const {token, loginDispatch} = useLogin();

    const onLoginClick=()=>{
      if(token?.access_token){
         loginDispatch({
          type : 'LOGOUT',
          
        })
      }else{
        navigate('auth/login')
      }
    }
  return (
    <header className="flex px-5 py-4 rounded-sm bg-gray-900 text-slate-500 ">
      <div>
        <h1 onClick={()=>navigate('/')} className="text-slate-50 font-semibold hover:cursor-pointer font-semibold text-3xl">DAINIKI</h1>
      </div>
      <nav className="ml-auto text-slate-50 flex gap-5">
        <span onClick={()=>navigate('/wishlist')} className="material-symbols-outlined hover:cursor-pointer text-3xl">favorite</span>
        <span onClick={()=>navigate('/cart')} className="material-symbols-outlined hover:cursor-pointer text-3xl">shopping_cart</span>
        <div className="group">
          <span className="material-symbols-outlined hover:cursor-pointer text-3xl">person</span>
          <div className="hidden group-hover:flex absolute right-0 mt-0 w-[72px] h-[30px] bg-slate-50 shadow-lg border-1 z-50 flex justify-center items-center text-gray-900">
          <button className="hover:text-gray-500" onClick={onLoginClick}>
            {
              token?.access_token ? 'Logout' : 'Login'
          }
            </button></div>
        </div>
      </nav>
    </header>
  );
};
