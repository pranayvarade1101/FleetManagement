// basic imports
import { useEffect, useState } from 'react';
import React from 'react';

// components imports
import Background from './myComponents/shared/Background/Background.jsx';
import Navbar from './myComponents/shared/navbar/Navbar.jsx';
import Hero from './myComponents/shared/Hero/Hero.jsx';
// import AboutUs from './myComponents/about/AboutUs.js';


// bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// Routing 
// import {BrowserRouter,Routes,Route} from 'react-router-dom';



// Logic Start
function App() {

  let heroData=[
    {text1:"Premium Busses",text2:"at your service"}, // for bus1 image
    {text1:"Dive into",text2:"a luxurious journey"}, // for bus2 image and so on
    {text1:"Our motto,",text2:"your satisfaction"},
    {text1:"We provide",text2:"Best in class Busses"},
    {text1:"Enjoy your",text2:"journey with us!"},
  ];

  //A hero is a container for your site’s most important content. 
  //It’s the largest and most visible container on the page and it should be used to showcase your brand or product.
  const [heroCount, setHeroCount]= useState(4); 
  // here heroCount is the count of the images of bus

  const [playStatus,setPlayStatus]=useState(false);
// playStatus is the status of background video. if true, video will play.


useEffect(()=>{// creating slideshow
  setInterval(()=>{// putting images in loop and setting delay
    setHeroCount((count)=>{return count===4 ? 0 : count+1})
  },3000);
},[]);

  return (
    <div classNameName="App">
    
    <Background // passing the props
      playStatus={playStatus} 
      heroCount={heroCount}
    /> 
    <Navbar/>
    <Hero // passing the props
      setPlayStatus={setPlayStatus}
      heroData={heroData[heroCount]}
      heroCount={heroCount}
      setHeroCount={setHeroCount}
      playStatus={playStatus}
    />

    {/* all Routes */}
     {/* <BrowserRouter>
      <Routes>
        <Route path="/about" element={<AboutUs/>}>About</Route>
      </Routes>
    </BrowserRouter>  */}

    </div>

  );
}

export default App;
