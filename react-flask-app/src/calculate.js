import React, { useState, useEffect } from 'react';
import './App.css';
import Device from './device';
import video from "./duck.mp4"

function Calculate() {
  const [devices, setDevices] = useState(1); 
  const addDevice = () => { setDevices(devices+1)}
  const [total, setTotal] = useState(0); 

  const f1 = (n) =>{
    setTotal(total + (1000*n))
  }
  const f2 = (n) => {
    setTotal(total + n)
  }

  return (
    <div className="App">
        <video autoPlay loop muted className='video'>
            <source src={video} type="video/mp4"/>
        </video>
        <div className="cover"></div>
        <div className='content'>
                <div className="title">Your laptop and jetset mindset are killing the environment</div>
            <div className='input'>
                {[...Array(devices)].map((e,i) => <div className='device'><Device fields={["Device size (sq inches)", "Hours"]} onChangeFunctions={[f1, f2]}/></div>)}
            </div>
            <br></br>
            <button onClick={addDevice} className="button">Add device</button>
            <div style={{color: "white"}}>Total: {total}</div>
      </div>
    </div>
  );
}

export default Calculate;