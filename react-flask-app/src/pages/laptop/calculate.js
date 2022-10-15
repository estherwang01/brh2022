import React, { useState, useEffect } from 'react';
import '../../App.css'
import Device from '../../components/Device/device';
import video from "../../files/duck.mp4"; 
import { getInt } from "../../util"; 
import left from "../../files/lefta.png"; 
import Icon from '../../components/icon/icon';

function Calculate() {

  const defaultVals = {
    "mode": "normal",
    "device_class" : "laptop",
    "device_size" : "large",
    "charges_per_day" : 1.0
  }
  const [view, setView] = useState(0); 
  const [zip, setZip] = useState(14853); 
  const [data, setData] = useState([{
    "mode": "normal",
    "device_class" : "laptop",
    "device_size" : "large",
    "charges_per_day" : 1.0
  }]); 
  
  const [devices, setDevices] = useState(1); 
  const [ret, setRet] = useState({}); 

  useEffect(()=>{
    const fetchData = async () => {
      const modified_data = { "zipcode": zip, "devices": data}
      await fetch("/compute_co2", {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(modified_data)
        }).then(response => response.json()).then(dat => { setRet(dat); })
    }
    fetchData()
  }, [data, ret])

  const addDevice = () => { 
    setDevices(devices+1); 
    setData([...data, defaultVals]); 
  }

  const setZipcode = (n) => {
    let ni = getInt(n, 14853); 
    setZip(ni); 
  }

  const setType = (index, value) => {
    let old = data[index]
    old["device_class"] = value; 
    setData([...data, old]); 
  }

  const setSize = (index, value) => {
    let old = data[index]
    old["device_size"] = value; 
    setData([...data, old]); 
  }

  const setCharges = (index, value) => {
    let old = data[index]
    old["charges_per_day"] = value; 
    setData([...data, old]); 
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
                {[...Array(devices)].map((e,i) => <div className='device'>
                  <Device fields={["Device Type", "Size (small/medium/large)", "Charges Per Day"]} 
                  onChangeFunctions={[(val) => setType(i, val), (val) => setSize(i, val), (val) => setCharges(i, val)]}/></div>)}
            </div>
            <br></br>
            <button onClick={addDevice} className="button">Add device</button>
           <div style={{display:"flex"}}>
            <Icon label="" value="" img="" />
            <Icon label="" value="" img="" />
            <Icon label="" value="" img="" />
            <Icon label="" value="" img="" />
            <Icon label="" value="" img="" />
            <Icon label="" value="" img="" />
            <Icon label="" value="" img="" />
           </div>
      </div>
    }
    </div>
  );
}

export default Calculate;