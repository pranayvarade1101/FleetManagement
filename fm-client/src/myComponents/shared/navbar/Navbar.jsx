import React from 'react'
import './navStyle.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <div className="nav-logo">
        FleetManagement 
      </div>
      <ul className="nav-menu">
            <li>Home</li>
            <li>Explore</li>
            <li>About</li>
            <li >Contact</li>
            <li className='nav-login'>Login/SignUp</li>
        </ul>
    </div>
  )
}

export default Navbar
