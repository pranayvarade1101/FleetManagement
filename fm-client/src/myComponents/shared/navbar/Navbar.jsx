import React from 'react'
import './navStyle.css'
import  'bootstrap/dist/css/bootstrap.css';

const Navbar = () => {
  return (
    <div className='nav d-flex align-items-center justify-content-around '>
      <div className="nav-logo ">
        FleetManagement 
      </div>
      <ul className="nav-menu d-flex align-items-center justify-content-center">
            <li>Home</li>
            <li>Explore</li>
            <li>About</li>
            <li>Contact</li>
            <li>Login/SignUp</li>
        </ul>
    </div>
  )
}

export default Navbar
