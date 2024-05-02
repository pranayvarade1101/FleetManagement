import React from 'react'
import './navStyle.css'

const Navbar = () => {
  return (
    <div className='nav'>
      <div className="nav-logo">
        FleetManagement 
      </div>
      {userAccountType === 'admin' && (
        <ul className="nav-menu">
          <li> <a href="/home"> Home </a> </li>
          <li><a href="/admin"> Admin </a> </li>
          <li> <a href="/about-us"> About Us </a> </li>
          <li className='nav-login'> <a href="/login"> Login/SignUp </a> </li>
        </ul>
      )}
      {userAccountType === 'customer' && (
        <ul className="nav-menu">
          <li> <a href="/home"> Home </a> </li>
          <li><a href="/home"> Explore </a> </li>
          <li> <a href="/about-us"> About </a> </li>
          <li> <a href="/home"> Contact </a> </li>
          <li className='nav-login'> <a href="/login"> Login/SignUp </a> </li>
        </ul>
      )}
      {userAccountType === 'driver' && (
        <ul className="nav-menu">
          <li> <a href="/home"> Home </a> </li>
          <li><a href="/home"> Explore </a> </li>
          <li> <a href="/about-us"> About </a> </li>
          <li> <a href="/home"> Contact </a> </li>
          <li className='nav-login'> <a href="/login"> Login/SignUp </a> </li>
        </ul>
      )}
    </div>
  )
}

export default Navbar
