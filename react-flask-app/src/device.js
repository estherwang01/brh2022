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
            <div>{field}</div>
            <div style={{width: '10px'}}></div>
            <input onChange={(e) => {
                props.onChangeFunctions[i](getInt(e.target.value))
            }
            }></input>
            <div style={{width: '10px'}}></div>
        </>)}
    </div>
  );
}

export default Device;