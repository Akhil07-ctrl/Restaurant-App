import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import Home from './components/Home'
import Cart from './components/Cart'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

// Local storage keys
const CART_ITEMS_KEY = 'cartItems'
const RESTAURANT_NAME_KEY = 'restaurantName'

// write your code here
const App = () => {
  // Initialize state from localStorage or empty defaults
  const [cartList, setCartList] = useState(() => {
    const savedCartItems = localStorage.getItem(CART_ITEMS_KEY)
    return savedCartItems ? JSON.parse(savedCartItems) : []
  })
  
  const [restaurantName, setRestaurantName] = useState(() => {
    return localStorage.getItem(RESTAURANT_NAME_KEY) || ''
  })

  // Save to localStorage whenever cart or restaurant name changes
  useEffect(() => {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartList))
  }, [cartList])

  useEffect(() => {
    localStorage.setItem(RESTAURANT_NAME_KEY, restaurantName)
  }, [restaurantName])

  const addCartItem = dish => {
    const isAlreadyExists = cartList.find(item => item.dishId === dish.dishId)

    if (!isAlreadyExists) {
      setCartList(prev => [...prev, dish])
    } else {
      setCartList(prev =>
        prev.map(item =>
          item.dishId === dish.dishId
            ? {...item, quantity: item.quantity + dish.quantity}
            : item,
        ),
      )
    }
  }

  const removeCartItem = dishId => {
    setCartList(prevState => prevState.filter(item => item.dishId !== dishId))
  }

  const removeAllCartItems = () => setCartList([])

  const incrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    )
  }

  const decrementCartItemQuantity = dishId => {
    setCartList(prevState =>
      prevState
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
        )
        .filter(item => item.quantity > 0),
    )
  }

  const getTotalCartQuantity = () => {
    return cartList.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
        removeAllCartItems,
        restaurantName,
        setRestaurantName,
        getTotalCartQuantity,
      }}
    >
      <Router basename='/Restaurant-App'>   
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>   
    </CartContext.Provider>
  )
}

export default App
