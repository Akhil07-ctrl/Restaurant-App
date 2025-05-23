import {Link} from 'react-router-dom'
import {useContext} from 'react'
import Header from '../Header'
import CartItem from '../CartItem'

import CartContext from '../../context/CartContext'
import './index.css'

const Cart = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)

  const renderEmptyView = () => (
    <div className="m-auto d-flex flex-column align-items-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty view"
        className="empty-view-image"
      />
      <p className="empty-description">Your cart is Empty.</p>
      <Link to="/">
        <button type="button" className="shop-now-btn">
          Shop Now
        </button>
      </Link>
    </div>
  )

  const renderCartItems = () => (
    <div className="cart-content">
      <div className="cart-items-header d-flex align-items-center justify-content-between">
        <h1>Cart Items</h1>
        <button
          type="button"
          className="remove-all-btn text-danger"
          onClick={removeAllCartItems}
        >
          Remove All
        </button>
      </div>
      <ul className="cart-items-list">
        {cartList.map(item => (
          <CartItem key={item.dishId} cartItemDetails={item} />
        ))}
      </ul>
    </div>
  )

  return (
    <div className="cart-page-container d-flex flex-column">
      <Header />
      <div className="cart-body-container d-flex flex-column">
        {cartList.length === 0 ? renderEmptyView() : renderCartItems()}
      </div>
    </div>
  )
}

export default Cart
