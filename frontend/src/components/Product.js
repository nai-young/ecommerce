import React, { useState, useEffect } from 'react'
import { detailsProduct } from '../actions/productAction'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

function Product (props) {
  const [quantity, setQuantity] = useState(1)
  const productDetails = useSelector(state => state.productDetails)
  const { product, loading, error } = productDetails
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id))
    return () => {
      //
    }
  }, [])

  const hanldleAddToCard = () => {
    props.history.push("/cart/" + props.match.params.id + "?quantity=" + quantity)
  }

  // stores pr who has the same _id as /product/:id
  // const product = data.products.find(pr => pr._id === props.match.params.id)
  return <div>
    <div className="back-to-result">
      <Link to="/">Back to result</Link>
    </div>
    { loading ? <div>Loading...</div> : 
      error ? <div>{error}</div> :
      (
        <div className="details">
          <div className="details-image">
            <img src={product.image} alt="product"/>
          </div>
          <div className="details-info">
            <ul>
              <li>
                <h3>{product.name}</h3>
              </li>
              <li>
                {product.rating} Stars ({product.numReviews}) Reviews
              </li>
              <li>
                Price: <b>${product.price}</b>
              </li>
              <li>
                Description:
                  <div>
                    {product.description}
                  </div>
              </li>
            </ul>
          </div>
          <div className="details-action">
            <ul>
              <li>
                Price: ${product.price}
              </li>
              <li>
                Status: { product.countInStock > 0 ? "In Stock" : "Out of Stock"}
              </li>
              <li>
                Quantity:
                <select value={quantity} onChange={(e) => {setQuantity(e.target.value)}}>
                  {[...Array(product.countInStock).keys()].map(e =>
                    <option key={e + 1} value={ e + 1 }>{ e + 1 }</option>
                    )}
                </select>
              </li>
              <li>
                { product.countInStock > 0 && <button onClick={hanldleAddToCard} className="button">Add to Cart</button>
              }
                
              </li>
            </ul>
          </div>
        </div>
      )
    }
  </div>
}
export default Product