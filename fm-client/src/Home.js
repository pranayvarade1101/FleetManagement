import React from 'react';
import "./Home.css"
import Logo from "./logo.svg"

const Home = () => {
  return (
    <div className="home-container">
        <img src={Logo} alt="Logo"/>
        <h1>Fleet Management</h1>
        <p>A MERN Stack Web Application</p>
    </div>
  );
};

export default Home;