import { Navbar } from "../../components/Navbar";
import { useCart } from "../../context/cart-context";
import { HorizontalProductCard } from "../../components/HorizontalProductCard";
import { PriceDetails } from "../../components/PriceDetails";
import { useLocation, useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cart } = useCart();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center pt-6 ">
        {cart?.length > 0 ? (
          <>
            <h2 className="text-3xl">My Cart</h2>
            <div className="flex gap-8">
              <div className="pt-4 flex pb-4 flex-col gap-4">
                {cart?.length > 0 &&
                  cart.map((product) => (
                    <HorizontalProductCard
                      key={product.id}
                      product={product}
                      path={path}
                    />
                  ))}
              </div>
              <div>
                <PriceDetails path={path} />
              </div>
            </div>
          </>
        ) : (
          <div >
            <h2 className=" text-3xl">Cart Empty</h2>
            <p className="text-[primary-color] hover:cursor-pointer underline " onClick={() => navigate("/")}>
              Click to add items to the cart
            </p>
          </div>
        )}
      </main>
    </>
  );
};
