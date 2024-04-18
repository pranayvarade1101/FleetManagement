
import './App.css';

//import bootstrap from 'bootstrap/dist/css/bootstrap.css';


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
    <div classNameName="App">
   
    <h1>hello fleet management <br/>
    Fleet Management System by Uday T</h1>
      <h1>{data}</h1>
    </div>
  );
}

export default App;
