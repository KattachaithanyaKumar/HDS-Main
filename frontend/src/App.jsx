import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import "./app.css"
import { CartProvider } from "react-use-cart"

//components
import Home from './pages/Home/Home'
import ProductPage from './pages/ProductPage'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Categorypage from './pages/Categorypage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <div className="app">
      <CartProvider>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/:category/:categoryId' element={<Categorypage />}/>
              <Route path='/:category/:categoryId/:productId' element={<ProductPage />}/>
              <Route path='/checkout' element={<Checkout />}/>
              <Route path='/Login' element={<Login />}/>
              <Route path='/user' element={<Profile />}/>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
      </CartProvider>
    </div>
  )
}

export default App