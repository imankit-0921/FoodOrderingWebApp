import { useState } from 'react'
import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'
import { Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <div>
      {showLogin ? <LoginPopup setShowLogin = {setShowLogin}/> : <></>}
      <div className='app'>
      <Navbar setShowLogin = {setShowLogin}/>
      <Routes>
        <Route path = '/' element={<Home/>}/>
        <Route path = '/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
    <br />
    <br />
    <Footer/>
    </div>
  )
}

export default App
