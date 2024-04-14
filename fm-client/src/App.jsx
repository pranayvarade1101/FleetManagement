
import './App.css';


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
    <div className="App">
    <h1>hello fleet management</h1>
      <h1>{data}</h1>
    </div>
  );
}

export default App;
