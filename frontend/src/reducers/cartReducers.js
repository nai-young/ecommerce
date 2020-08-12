import { ADD_CART_ITEM, REMOVE_CART_ITEM } from "../constants/cartConstants"


function cartReducer (state = { cartItems: [] }, action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload
      const product = state.cartItems.find(e => e.product === item.product)
      if (product) {
        return { cartItems: state.cartItems.map(e => e.product === product.product ? item: e)}
      }
      return { cartItems: [...state.cartItems, item]}
    default:
      return state
    case REMOVE_CART_ITEM:
      return { cartItems: state.cartItems.filter(e => (e.product !== action.payload)) }
  } 
}
export { cartReducer }