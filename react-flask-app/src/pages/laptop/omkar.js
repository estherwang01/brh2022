import React, { useState, useEffect } from 'react';
import '../../App.css';
import train from "../../files/train.jpg"
import { getInt, isValidZipCode } from "../../util";

function Omkar() {
  const [view, setView] = useState(0);
  const [zip, setZip] = useState(14850);
  const [ret, setRet] = useState({
    "car_user_percentage": 0, 
    "csa": "",
    "new_car_user_percentage":0, 
    "new_csa":"", 
    "total_co2": 0
  });

  useEffect(() => {
  }, [ret])

  const fetchData = async () => {
    let modified_data = { "zipcode": zip }
    await fetch("/compute_cars", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modified_data)
    }).then(response => response.json()).then(dat => {
      if(dat["successful_retrieval"]){
        setRet(dat);
      }
    })
  }

  const setZipcode = (n) => {
    if (isValidZipCode(n)) {
      let ni = getInt(n, 14850);
      setZip(ni);
    }
  }

  return (
    <div className="App" >
      {console.log(ret)}
      {view === 0 ?
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, 0)" }}>
          <div style={{ display: "flex", width: "fit-content", margin: "auto" }}>
            <div className='title2'>Enter your zip code</div><input className='input' onChange={(e)=>{
              setZipcode(e.target.value); 
            }}></input>
          </div>
          <button className='button' onClick={() => {
            setView(1); 
            fetchData(); 
          }}>lfg fucking go!</button>
        </div>
        :
        <div>
          <div className='title2'>You currently consume {(ret["total_co2"]).toFixed(2)} pounds of CO2 per year in {ret["csa"].substring(0, ret["csa"].indexOf(","))}.</div>
          <div className='title2'>{(ret["car_user_percentage"]*100).toFixed(2)}% of people here use cars. That's really fucking bad.</div>
          <div className='title2'>Might we suggest you move to {ret["new_csa"].substring(0, ret["csa"].indexOf(","))} where only {(ret["new_car_user_percentage"]*100).toFixed(2)}% of people use cars. </div>
          <div className='title2'>Also, here's a customized plan to improve your public transportation in your area:</div>
          <img alt="" src={train} />
        </div>}
    </div>
  );
}

export default Omkar;




