import { Navbar } from "../../components/Navbar";
import { useCart } from "../../context/cart-context";
import { HorizontalProductCard } from "../../components/HorizontalProductCard";
import { PriceDetails } from "../../components/PriceDetails";
import { useLocation } from "react-router-dom";

export const Wishlist = () => {
  const { wishlist } = useCart();
  const location= useLocation();
  const path = location.pathname;
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center pt-6 ">
        <h2 className="text-3xl">My WishList</h2>
        <div className="flex gap-8">
          <div className="pt-4 flex pb-4 flex-col gap-4">
            {wishlist?.length > 0 &&
              wishlist.map((product) => (
                <HorizontalProductCard key={product.id} product={product} path={path}/>
              ))}
          </div>
          <div>
          <PriceDetails path={path}/>
          </div>

        </div>
      </main>
    </>
  );
};
