import React from 'react'
import './Background.css'
import bus1 from '../../../assets/bus/bus1.jpg'
import bus2 from '../../../assets/bus/bus2.jpg'
import bus3 from '../../../assets/bus/bus3.jpg'
import bus4 from '../../../assets/bus/bus4.jpg'
import bus5 from '../../../assets/bus/bus5.jpg'
// import bus video


const Background = ({/*destructuring props*/ heroCount,playStatus}) => {
  if(playStatus){
    return(
        // <video className='background' autoPlay loop muted>
        //     <source src={videoBus} type='video/mp4'/>
        // </video>
        <div className="video">
            <h2>Playing Video</h2>
        </div>
    )
  }else if(heroCount===0){
    return <img src={bus1} className='background fade-in' alt="busImage1" />
  }else if(heroCount===1){
    return <img src={bus2} className='background fade-in' alt="busImage1" />
  }else if(heroCount===2){
    return <img src={bus3} className='background fade-in' alt="busImage1" />
  }else if(heroCount===3){
    return <img src={bus4} className='background fade-in' alt="busImage1" />
  }else if(heroCount===4){
    return <img src={bus5} className='background fade-in' alt="busImage1" />
  }
}

export default Background
