import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../../context/cart-context";
import { findProductInCart } from "../../utils/findProductInCart";
import { findProductInWishList } from "../../utils/findProductInWishList";
import { getProductDetails } from "../../api/getAllProducts";

export const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { cart, wishlist, cartDispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const isProductInCart = findProductInCart(cart, productId);
  const isProductInWishlist = findProductInWishList(wishlist, productId);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const data = await getProductDetails(productId);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const onCartClick = (e) => {
    e?.stopPropagation();
    if (!isProductInCart) {
      cartDispatch({
        type: "ADD_TO_CART",
        payload: { product, quantity },
      });
    } else {
      navigate("/cart");
    }
  };

  const onWishlistClick = (e) => {
    e?.stopPropagation();
    if (!isProductInWishlist) {
      cartDispatch({
        type: "ADD_TO_WISHLIST",
        payload: { product },
      });
    } else {
      navigate("/wishlist");
    }
  };

  if (loading) {
    return <div className="text-center py-8 dark:text-white">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 dark:text-red-400">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (!product) {
    return <div className="text-center py-8 dark:text-white">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden dark:border-gray-700 bg-white dark:bg-gray-800">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="w-full h-96 object-contain"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto py-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 border rounded-md overflow-hidden bg-white dark:bg-gray-800 ${
                  currentImageIndex === index 
                    ? "border-blue-500 border-2 dark:border-blue-600" 
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6 dark:text-white">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">
                  {i < Math.floor(product.rating || 0) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="dark:text-gray-300">
              ({Math.floor((product.rating || 0) * 10 + 5)} reviews)
            </span>
          </div>

          <div className="text-2xl font-semibold dark:text-white">${product.price}</div>

          <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

          <div className="border-t pt-4 dark:border-gray-700">
            <h3 className="font-medium">
              Category: {product.category?.name || "General"}
            </h3>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex items-center border rounded-md mr-auto dark:border-gray-700">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="px-3 py-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                -
              </button>
              <span className="px-3 py-1 border-x dark:border-gray-700 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="px-3 py-1 text-xl hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white"
              >
                +
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex space-x-4">
                <button
                  onClick={onCartClick}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                    isProductInCart
                      ? "bg-red-50 dark:bg-gray-700 border border-red-200 dark:border-gray-600 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-600"
                      : "bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  }`}
                >
                  <span className="material-symbols-outlined">
                    {isProductInCart ? "shopping_cart_checkout" : "shopping_cart"}
                  </span>
                  {isProductInCart ? "Go To Cart" : "Add To Cart"}
                </button>
                <button
                  onClick={onWishlistClick}
                  className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                    isProductInWishlist
                      ? "bg-red-50 dark:bg-gray-700 border border-red-200 dark:border-gray-600 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-gray-600"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                  }`}
                >
                  <span className={`material-symbols-outlined ${isProductInWishlist ? "text-red-500" : ""}`}>
                    {isProductInWishlist ? "heart_check" : "favorite"}
                  </span>
                  {isProductInWishlist ? "View Wishlist" : "Add To Wishlist"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};