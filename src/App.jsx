import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import Checkout from './pages/Checkout.jsx'
import NavBar from './components/NavBar.jsx'
import AuthProvider, { AuthContext } from './context/AuthContext.jsx'

function App() {


  return (
    <AuthProvider> 
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div>
       </AuthProvider>
  )
}

export default App
