import React, { useState, useEffect } from 'react';
import '../../App.css';
import train from "../../files/train.jpg"
import { getInt, isValidZipCode } from "../../util";

function Omkar() {
  const [view, setView] = useState(0);
  const [zip, setZip] = useState(14850);
  const [ret, setRet] = useState({});

  const fetchData = async () => {
    modifiedData = { "zipcode": zip }
    await fetch("/compute_co2", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(modified_data)
    }).then(response => response.json()).then(dat => {
      setRet(dat);
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
      {view == 0 ?
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, 0)" }}>
          <div style={{ display: "flex", width: "fit-content", margin: "auto" }}>
            <div className='title2'>Enter your zip code</div><input className='input'></input>
          </div>
          <button className='button' onClick={() => setView(1)}>lfg fucking go!</button>
        </div>
        :
        <div>
          <div className='title2'>Here's a customized plan to improve your public transportation:</div>
          <img src={train} />
        </div>}
    </div>
  );
}

export default Omkar;




