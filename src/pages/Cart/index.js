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
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>
      <div className="pt-20 overflow-hidden">
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 px-4 sm:px-6">
        {cart?.length > 0 ? (
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 dark:text-white">
              My Cart ({cart.length})
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
                  <div className="space-y-4">
                    {cart.map((product) => (
                      <HorizontalProductCard 
                        key={product.id}
                        product={product}
                        path={path}
                        className="border-b dark:border-gray-700 last:border-b-0 pb-4 last:pb-0"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Price Details - Sticky on desktop */}
              <div className="lg:w-80 xl:w-96">
                <div className="lg:sticky lg:top-24">
                  <PriceDetails path={path} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">
              Your Cart is Empty
            </h2>
            <p 
              className="text-gray-900 dark:text-gray-300 hover:opacity-80 cursor-pointer underline text-lg"
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </p>
          </div>
        )}
      </main>
      </div>
      
    </>
  );
};