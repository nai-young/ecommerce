import React, { useEffect } from 'react'
import  { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartAction'
import { Link } from 'react-router-dom'

function Cart (props) {
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  const productId = props.match.params.id
  const quantity = props.location.search? Number(props.location.search.split("=")[1]) : 1
  const dispatch = useDispatch()

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId))
  }

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping')
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity))
    }
  }, [])

  return <div className="cart">
    <div className="cart-list">
      <ul className="cart-list-container">
        <li>
          <h3>
            Shopping Cart   
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
          <div>
            Cart is empty
          </div>
          :
          cartItems.map(e => 
            <li>
              <div className="cart-image">
                <img src={e.image} alt="product"/>
              </div>
              <div className="cart-name">
                <div>
                  <Link to={"/product/" + e.product} >
                    <b>{e.name}</b>
                  </Link>
                </div>
              <div>
                Quantity:
                <select value={e.quantity} onChange={item => dispatch(addToCart(e.product, item.target.value))}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
                <button type="button" className="button" onClick={() => removeFromCartHandler(e.product)}>
                  Remove
                </button>
              </div>
            </div>
            <div className="cart-price">
              ${e.price}
            </div>
            </li>
          )
        }
      </ul>
    </div>
    <div className="cart-action">
        <h3>
          Subtotal ({ cartItems.reduce((a, c) => a + c.quantity, 0) } items)
          :
          $ { cartItems.reduce((a, c) => a + c.price * c.quantity, 0) }
        </h3>
        <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>Proceed to Checkout</button>
    </div>
  </div>
}
export default Cart