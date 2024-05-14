import React from 'react'
import './Hero.css'

// bootstrap
import bootstrap from 'bootstrap/dist/css/bootstrap.css';

// components
import PageHome from '../../home/PageHome/PageHome.jsx';

// importing media
import arrow_gif from '../../../assets/icons/arrow_gif.gif'
import play_icon from '../../../assets/icons/play_icon.png'
import pause_icon from '../../../assets/icons/pause_icon.png'

// importing Link and outlet for routing
import { Outlet,Link } from 'react-router-dom'


// logic 
const Hero = ({/*destructuring props*/heroData,setHeroCount,heroCount,setPlayStatus,playStatus}) => {

  
  return (
    <div className='hero'>
      <div className="hero-text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <button className="explore-btn d-flex justify-content-center align-items-center ps-5"> 
        <Link className='dive-in' to="/PageHome">Dive IN</Link>
        <img className='arrowBtn ms-3' src={arrow_gif} alt="arrorBtn" />
      </button>
      <div className="hero-dot-play">
        <ul className="hero-dots">
         {/* using ternary operator for image dots for applying color only for the dot who's image is displaying  */}
            <li onClick={()=>setHeroCount(0)} className={heroCount===0? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={()=>setHeroCount(1)} className={heroCount===1? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={()=>setHeroCount(2)} className={heroCount===2? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={()=>setHeroCount(3)} className={heroCount===3? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={()=>setHeroCount(4)} className={heroCount===4? "hero-dot orange" : "hero-dot"}></li>
        </ul>
        <div className="hero-play" onClick={()=>setPlayStatus(!playStatus)}>
            <img src={playStatus ? pause_icon : play_icon} alt="" />
            <p>Play Video</p>
        </div>
      </div>

     

    <Outlet></Outlet>
    </div>
  )
}


export default Hero
