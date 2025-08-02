export const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART":
      const existingCartItem = state.cart.find(item => item.id === payload.product.id);
      if (existingCartItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === payload.product.id
              ? { ...item, quantity: item.quantity + (payload.quantity || 1) }
              : item
          )
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...payload.product, quantity: payload.quantity || 1 }]
        };
      }
    
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === payload.id
            ? { ...item, quantity: payload.quantity }
            : item
        )
      };

    case 'ADD_TO_WISHLIST':
      return {
        ...state,
        wishlist: [...state.wishlist, payload.product]
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: []
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== payload.id)
      };

    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter((product) => product.id !== payload.id)
      };

    case 'MOVE_TO_CART':
      // Check if product already exists in cart
      const existingInCart = state.cart.find(item => item.id === payload.product.id);
      return {
        ...state,
        cart: existingInCart
          ? state.cart.map(item =>
              item.id === payload.product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          : [...state.cart, { ...payload.product, quantity: 1 }],
        wishlist: state.wishlist.filter((product) => product.id !== payload.product.id)
      };

    case 'MOVE_TO_WISHLIST':
      // Check if product already exists in wishlist
      const existingInWishlist = state.wishlist.find(item => item.id === payload.product.id);
      return {
        ...state,
        wishlist: existingInWishlist
          ? state.wishlist // if exists, don't add again
          : [...state.wishlist, payload.product],
        cart: state.cart.filter((product) => product.id !== payload.product.id)
      };

    default:
      return state;
  }
};