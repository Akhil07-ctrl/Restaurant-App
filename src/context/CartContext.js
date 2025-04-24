import {createContext} from 'react'

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  setRestaurantName: () => {},
  removeAllCartItems: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  getTotalCartQuantity: () => {},
})

export default CartContext
