import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AboutUs from './AboutUs';
import './App.css';

import bootstrap from 'bootstrap/dist/css/bootstrap.css';


//for testing
import {useState, useEffect} from 'react';
//functions
import {getTest} from "./functions/test"

function App() {

  //testing
  const [data, setData]=useState("Hello world!");
  useEffect(()=>{
    getTest()
      .then((res)=>{
        setData(res.message);
      })
      .catch((err)=>console.log(err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/about-us' element={<AboutUs/>} />
      </Routes>
    </Router>
  );
}

export default App;
