import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL  } from '../constants/productConstants'
import axios from 'axios'

const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get("/products")
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  }
  catch(err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.message })
  }
}

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId })
    const { data } = await axios.get('/products/' + productId)
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  }
  catch(err) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: err.message })
  }
}
export { listProducts, detailsProduct } 