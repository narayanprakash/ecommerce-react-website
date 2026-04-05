import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import Checkout from './pages/Checkout.jsx'
import NavBar from './components/NavBar.jsx'
import AuthProvider, { AuthContext } from './context/AuthContext.jsx'
import { useContext } from 'react'
import ProductDetails from './pages/ProductDetails.jsx'
import CartProvider from './context/CartContext.jsx'

function App() {


  return (
    <AuthProvider> 
      <CartProvider>
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:id" element={<ProductDetails />} />
      </Routes>
    </div>
    </CartProvider>
       </AuthProvider>
  )
}

export default App
