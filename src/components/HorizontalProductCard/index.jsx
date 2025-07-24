// import { useCart } from "../../context/cart-context";
export const HorizontalProductCard = ({product, path}) => {

  // const {cartDispatch} = useCart();
  // const onRemoveClick =(product)=>{
  //   cartDispatch({
  //     type: path==='/cart' ? 'REMOVE_FROM_CART' : 'REMOVE_FROM_WISHLIST',
  //     payload: {id: product.id}
  //   })
  // }

  // const onMoveClick =(product)=>{
  //   cartDispatch({
  //     type: path==='/cart' ? 'MOVE_TO_WISHLIST' : 'MOVE_TO_CART',
  //     payload: {product}
  //   })
  // }

  return (
    <div>
      <div className="card-horizontal  d-flex shadow-2xl">
        <div className="card-hori-image-container relative">
          <img className="card-image" src={product.images[0]} alt="shoes" />
          
        </div>
        <div className="card-details d-flex direction-column">
          <div className="card-des">{product.title}</div>
          <div className="card-description">
            <p className="card-price">
              Rs. {product.price}
             
              </p>
          </div>
          <div className="quantity-container d-flex gap">
            <p className="q-title">Quantity: </p>
            <div className="count-container d-flex align-center gap">
              <button className="count">-</button>
              <span className="count-value">1</span>
              <button className="count">+</button>
            </div>
          </div>
          <div className="cta-btn d-flex gap">
            <div className="cta-btn">
              <button  className="button hori-btn btn-primary btn-icon d-   flex align-center justify-center gap cursor btn-margin">
                {path==='/cart' && 'Remove From Cart'}
                {path==='/wishlist' && 'Remove From wishlist'}
              </button>
            </div>
            <div className="cta-btn">
              <button  className="button hori-btn btn-outline-primary btn-icon d-flex align-center justify-center gap cursor btn-margin">
                {path==='/cart' && 'Move To Wishlist'}
                {path==='/wishlist' && 'Move To Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
