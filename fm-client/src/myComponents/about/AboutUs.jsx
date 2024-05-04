import React from 'react';
import "./AboutUs.css"

import Logo from "../../assets/logo.svg";


const AboutUs = () => {
  return (
    <div className="about-us-container">


      <img src={Logo} alt="Logo"/>

      <h1>About Us</h1>
      <p>
        Your Bus Booking is a fleet management web app that provides a
        seamless and convenient way for passengers to book bus tickets online.
        Our mission is to make bus travel accessible and affordable for everyone,
        while providing a user-friendly and efficient booking experience.
      </p>
    </div>
  );
};

export default AboutUs;