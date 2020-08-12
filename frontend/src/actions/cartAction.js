import axios from 'axios'
import Cookie from 'js-cookie'
import { ADD_CART_ITEM, REMOVE_CART_ITEM } from '../constants/cartConstants'

const addToCart = (productId, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get('/products/' + productId)
    dispatch({ 
      type: ADD_CART_ITEM, payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity
      }
    })
    const { cart: { cartItems }} = getState()
    Cookie.set('cartItems', JSON.stringify(cartItems))
  }
  catch(err) {

  }
}

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: productId })

  const { cart: { cartItems }} = getState()
  Cookie.set('cartItems', JSON.stringify(cartItems))
}

export { addToCart, removeFromCart }