import React, { useState, useEffect } from 'react';
import '../../App.css';
import train from "../../files/train.jpg"

function Omkar() {
  const [view, setView] = useState(0); 

  return (
    <div className="App" >
      {view == 0 ? 
      <div style={{position: "absolute", top: "20%", left: "50%", transform:"translate(-50%, 0)"}}>
        <div style={{display: "flex",  width: "fit-content", margin: "auto"}}>
          <div className='title2'>Enter what city you live in</div><input className='input'></input>
        </div>
        <button className='button' onClick={() => setView(1)}>lfg fucking go!</button>
      </div>
                   : 
        <div>
          <div className='title2'>Here's a customized plan to improve your public transportation:</div>
          <img src = {train}/>
          </div>}
    </div>
  );
}

export default Omkar;




