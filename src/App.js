import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { LoginAuth } from './pages/LoginAuth';
import { UserRegistration } from './pages/UserRegistration';
import { ProductDescription } from './pages/ProductDescription';
function App() {
  return (
    <div className="bg-slate-50 ">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        <Route path='/auth/login' element={<LoginAuth />} />
        <Route path='/auth/register/user' element={<UserRegistration />} />
        <Route path='/products/:productId' element={<ProductDescription />} />
      </Routes>
    </div>
  );
}

export default App;
