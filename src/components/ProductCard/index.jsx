import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";
import { useNavigate } from "react-router-dom";
import { findProductInWishList } from "../../utils/findProductInWishList";

export const ProductCard = ({ product }) => {
    
    const {cart,wishlist,cartDispatch} = useCart();
    const isProductInCart = findProductInCart(cart,product.id)
    const isProductInWishlist = findProductInWishList(wishlist,product.id)
    const navigate = useNavigate();
    
    const onCartClick=(product)=>{
        !isProductInCart?
        cartDispatch({
            type:'ADD_TO_CART',
            payload: {product}
        }):
        navigate('/cart')
    }
    const onWishlistClick=(product)=>{
        !isProductInWishlist?
        cartDispatch({
            type:'ADD_TO_WISHLIST',
            payload: {product}
        }):
        navigate('/wishlist')
    }
  return (
     
    <div className="card card-vertical d-flex  direction-column relative shadow">
      <div className="card-image-container">
        <img className="card-image" src={product.images[0]} alt="shoes" />
      </div>
      <div className="card-details">
        <div className="card-des">{product.title}</div>
        <div className="card-description">
          <p className="card-price">Rs.{product.price}</p>
        </div>
        <div className="cta-btn">
            <button onClick={()=>onCartClick(product)} 
            className="button btn-primary btn-icon cart-btn d-flex  align-center justify-center gap cursor btn-margin">
            <span className="material-symbols-outlined ">
                {
                    isProductInCart ? 'shopping_cart_checkout' : 'shopping_cart'
                }
                </span>
                {
                    isProductInCart ? 'Go To Cart' : 'Add To Cart'
                }
            
          </button>
          <button onClick={()=>onWishlistClick(product)} className="button btn-primary btn-icon cart-btn d-flex align-center justify-center gap cursor btn-margin">
            <span className="material-symbols-outlined ">
                {
                    isProductInWishlist ? 'heart_check' : 'favorite'
                }

            </span>
            {
                isProductInWishlist ? 'Go To WishList' :'Add To Wishlist'
            }
          </button>
        </div>
      </div>
    </div>
  );
};
