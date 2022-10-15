import React, { useState, useEffect } from 'react';
import '../../App.css'
import Device from '../../components/Device/device';
import video from "../../files/duck.mp4"; 
import { getInt } from "../../util"; 
import left from "../../files/lefta.png"; 

function Calculate() {
  const [view, setView] = useState(0); 
  const [zip, setZip] = useState(14853); 

  const [devices, setDevices] = useState(1); 
  const addDevice = () => { setDevices(devices+1)}
  const [total, setTotal] = useState(0); 

  const f1 = (n) =>{
    setTotal(total + (1000*n))
  }
  const f2 = (n) => {
    setTotal(total + n)
  }

  const setZipcode = (n) => {
    let ni = getInt(n, 14853); 
    setZip(ni); 
  }

  return (
    <div className="App">
      {view == 1 && 
            <img src={left} style={{position: "absolute", top: "-200px", left:"-210px", zIndex:'100', transform: 'scale(0.1)'
          }} onClick={() => setView(0)}/>
      }
        <video autoPlay loop muted className='video'>
            <source src={video} type="video/mp4"/>
        </video>
        <div className="cover"></div>
        {
          view == 0 ? 
          <div className='content'>
            <div className="title">Your laptop and jetset mindset are killing the environment</div>
            <div style={{display:"flex", margin: "auto", width: "fit-content", verticalAlign: "middle", alignItems: "center"}}>
              <div className='title2'>Enter your zip code:</div>
              <input style={{height: "fit-content"}} onChange={(e) => setZipcode(e.target.value)}></input>
            </div>
            <br></br>
            <button className='button' onClick={() => setView(1)}>aint no way</button>
          </div>
        :
        <div className='content'>
            <div className='title2'>Zipcode: {zip}</div>
            <div className='devicesContainer'>
                {[...Array(devices)].map((e,i) => <div className='device'><Device fields={["Device size (sq inches)", "Hours"]} onChangeFunctions={[f1, f2]}/></div>)}
            </div>
            <br></br>
            <button onClick={addDevice} className="button">Add device</button>
            <div style={{color: "white"}}>Total: {total}</div>
      </div>
    }
    </div>
  );
}

export default Calculate;