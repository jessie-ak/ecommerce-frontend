import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
function App() {
  return (
    <div className="bg-slate-50 ">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
      </Routes>
    </div>
  );
}

export default App;
