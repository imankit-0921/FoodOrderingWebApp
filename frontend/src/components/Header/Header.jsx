import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>Order Your Favourite Food Here</h2>
        <p>Our food delivery app brings your favorite dishes right to your doorstep, connecting you with a wide variety of local restaurants and cuisines.</p>
        <a href='#explore-menu'>
        <button>View Menu</button>
        </a>
      </div>
    </div>
  )
}

export default Header
