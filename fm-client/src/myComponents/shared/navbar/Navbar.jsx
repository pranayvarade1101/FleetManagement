import React from 'react'
import { Link, Outlet } from 'react-router-dom';
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
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/admin">Admin</Link> </li>
          <li> <Link to="/about-us">About Us</Link> </li>
          <li className='nav-login'> <Link to="/login"> Login/SignUp </Link> </li>

        </ul>
      )}
      {userAccountType === 'customer' && (
        <ul className="nav-menu d-flex align-items-end justify-content-center ">
          <li> <Link to="/">Home</Link> </li>
          <li> <Link to="/home">Explore</Link> </li>
          <li> <Link to="/about-us">About</Link> </li>
          <li> <Link to="/home">Contact</Link> </li>
          <li className='nav-login'> <Link to="/login"> Login/SignUp </Link> </li>
          <Outlet></Outlet>
        </ul>
      )}
      {userAccountType === 'driver' && (
        <ul className="nav-menu d-flex align-items-end justify-content-center ">
          <li> <Link to="/"> Home </Link> </li>
          <li><Link to="/home"> Explore </Link> </li>
          <li> <Link to="/about-us"> About </Link> </li>
          <li> <Link to="/home"> Contact </Link> </li>
          <li className='nav-login'> <Link to="/login"> Login/SignUp </Link> </li>
        </ul>
      )}
      </div>
    </div>
  )
}

export default Navbar;