import React, { useState, useEffect } from 'react';
import './App.css';
import Device from './device';

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
      <div className = "calculateTitle" style={{backgroundColor: "#333333", height: "10vh"}}>
        <div className="title">Your laptop and jetset mindset are killing the environment</div>
      </div>
      <div className="body" style={{display:"flex"}}>
        <div className="leftPanel" style={{width: "30vw", backgroundColor: "grey", height: "90vh"}}>
          <div>Let's put some fun facts over here</div>
        </div>
        <div className="rightPanel" style={{width: "70vw", marginTop: "60px"}}>
          <div className='input'>
            {[...Array(devices)].map((e,i) => <div className='device'><Device fields={["Device size (sq inches)", "Hours"]} onChangeFunctions={[f1, f2]}/></div>)}
          </div>
          <button onClick={addDevice}>Add device</button>
          <div style={{color: "white"}}>Total: {total}</div>
        </div>

      </div>
    </div>
  );
}

export default Calculate;