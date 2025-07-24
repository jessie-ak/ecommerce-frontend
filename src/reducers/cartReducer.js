export const cartReducer=(state, {type, payload})=>{
    switch (type){
        case 'ADD_TO_CART':
            return {...state, cart:[...state.cart,payload.product]}
        case 'ADD_TO_WISHLIST':
            return {...state, wishlist:[...state.wishlist,payload.product]}
        // case 'REMOVE_FROM_CART':
        //     return state.cart.filter((product)=> product.id !== payload.id)
        // case 'REMOVE_FROM_WISHLIST':
        //     return state.wishlist.filter((product)=> product.id !== payload.id)
        // case 'MOVE_TO_CART':
        //     return{...state, cart:[...state.cart, payload.product], 
        //         wishlist: state.wishlist.filter((product)=> product.id !== payload.product.id)}
        // case 'MOVE_TO_WISHLIST':
        //     return{...state, cart: state.cart.filter((product)=> product.id !== payload.product.id),
        //         wishlist: [...state.wishlist, payload.product]
            // }
        default:
            return state;
    }
}