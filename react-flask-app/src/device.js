import React, { useState, useEffect } from 'react';
import "./device.css"; 

function Device(props) {

  const getInt = (n) => {
    if(parseInt(n) != NaN){
        return parseInt(n); 
    } else return 0 
  }  
  return (
    <div className="container">
        {props.fields.map((field, i) => <>
            <div className="field">{field}</div>
            <div className='pad'></div>
            <input className='input' onChange={(e) => {
                props.onChangeFunctions[i](getInt(e.target.value))
            }
            }></input>
            <div className='pad'></div>
        </>)}
    </div>
  );
}

export default Device;