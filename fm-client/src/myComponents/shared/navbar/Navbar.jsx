import React from 'react'
import './navStyle.css'

import 'bootstrap/dist/css/bootstrap.css';


import Logo from "../../../assets/logo.svg";

const Navbar = () => {

  const userAccountType='customer'; // for now hard-coded

  return (

    <div className='nav px-5 d-flex justify-content-between align-items-center '>
      <div className="nav-start d-flex align-items-center justify-content-center">
        <div className="nav-logo me-5 px-3">
          <img src={Logo} alt='logo' className='logo '/>
          </div>
        FleetManagement 
      </div>
      <div className="nav-content d-flex justify-content-center align-items-center">
      {userAccountType === 'admin' && (
        <ul className="nav-menu d-flex align-items-end justify-content-center ">
          <li> <a href="/home"> Home </a> </li>
          <li><a href="/admin"> Admin </a> </li>
          <li> <a href="/about-us"> About Us </a> </li>
          <li className='nav-login'> <a href="/login"> Login/SignUp </a> </li>

        </ul>
      )}
      {userAccountType === 'customer' && (
        <ul className="nav-menu d-flex align-items-end justify-content-center ">
          <li> <a href="/home"> Home </a> </li>
          <li><a href="/PageHome"> Explore </a> </li>
          <li> <a href="/about-us"> About </a> </li>
          <li> <a href="/home"> Contact </a> </li>
          <li className='nav-login'> <a href="/login"> Login/SignUp </a> </li>
        </ul>
      )}
      {userAccountType === 'driver' && (
        <ul className="nav-menu d-flex align-items-end justify-content-center ">
          <li> <a href="/home"> Home </a> </li>
          <li><a href="/home"> Explore </a> </li>
          <li> <a href="/about-us"> About </a> </li>
          <li> <a href="/home"> Contact </a> </li>
          <li className='nav-login'> <a href="/login"> Login/SignUp </a> </li>
        </ul>
      )}
      </div>
    </div>
  )
}

export default Navbar
