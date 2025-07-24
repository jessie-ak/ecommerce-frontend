import { useCart } from "../../context/cart-context";
import { getTotalCartAmount } from "../../utils/getTotalCartAmount";
export const PriceDetails = ({path}) => {
  const { cart } = useCart();
  const totalCartAmount = getTotalCartAmount(cart || []);
    const deliveryCharge =  49;
  return (
    <div className="w-[300px] bg-[#fafafa] p-4">
      <p className="text-2xl border-b p-2">Price Details</p>
      <div className="flex flex-col gap-5 border-b p-2">
        <div className="flex">
          <p>Price ({cart.length}) items</p>
          <p className="ml-auto">Rs. {totalCartAmount}</p>
        </div>
        <div className="flex">
          <p>Delivery Charge</p>
          <p className="ml-auto">Rs. {deliveryCharge}</p>
        </div>
      </div>
      <div className="flex border-b p-2">
        <p>Total Amount</p>
        <p className="ml-auto">Rs. {totalCartAmount + deliveryCharge}</p>
      </div>
      <div className="p-2">
        <button className="button hori-btn btn-primary btn-icon d-   flex align-center justify-center gap cursor btn-margin">
          {path==='/cart' && 'Remove From Cart'}
          {path==='/wishlist' && 'Remove From Wishlist'}

        </button>
      </div>
    </div>
  );
};
