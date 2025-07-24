import { useNavigate } from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate();
  return (
    <header className="flex px-5 py-4 rounded-sm bg-gray-900 text-slate-500 ">
      <div>
        <h1 onClick={()=>navigate('/')} className="text-slate-50 font-semibold hover:cursor-pointer font-semibold text-3xl">DAINIKI</h1>
      </div>
      <nav className="ml-auto text-slate-50 flex gap-5">
        <span onClick={()=>navigate('/wishlist')} className="material-symbols-outlined hover:cursor-pointer text-3xl">favorite</span>
        <span onClick={()=>navigate('/cart')} className="material-symbols-outlined hover:cursor-pointer text-3xl">shopping_cart</span>
        <span className="material-symbols-outlined hover:cursor-pointer text-3xl">person</span>
      </nav>
    </header>
  );
};
