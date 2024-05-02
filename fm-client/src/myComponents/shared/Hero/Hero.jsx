
// // basic imports
import React from 'react'
import './Hero.css'

// media imports
import arrow_gif from '../../../assets/icons/arrow_gif.gif'
import play_icon from '../../../assets/icons/play_icon.png'
import pause_icon from '../../../assets/icons/pause_icon.png'

// bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'



const hero = ({/*destructuring props*/heroData,setHeroCount,heroCount,setPlayStatus,playStatus}) => {

    
  return (
    <div className='hero'>
      <div className="hero-text">
        <p>{heroData.text1}</p>
        <p>{heroData.text2}</p>
      </div>
      <div className="hero-explore">
        <button className='explore-btn justify-content-center'>Dive In
        <img className='arrowBtn' src={arrow_gif} alt="arrorBtn" />
        </button>
        
      </div>
      <div className="hero-dot-play">
        <ul className="hero-dots">
         {/* using ternary operator for image dots for applying color only for the dot who's image is displaying  */}
            <li onClick={()=>setHeroCount(0)} className={heroCount===0? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={()=>setHeroCount(1)} className={heroCount===1? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={()=>setHeroCount(2)} className={heroCount===2? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={()=>setHeroCount(3)} className={heroCount===3? "hero-dot orange" : "hero-dot"}></li>
            <li onClick={()=>setHeroCount(4)} className={heroCount===4? "hero-dot orange" : "hero-dot"}></li>
        </ul>
        
        <div className="hero-play"> {/* background video */}
            <img onClick={()=>setPlayStatus(!playStatus)} src={playStatus ? pause_icon : play_icon} alt="" />
            <p>play video</p>
        </div>
      </div>
    </div>
  )
}

export default hero
