import React, { useState, useEffect } from 'react';
import "./device.css"; 
import { getInt } from "../../util"; 

function Device(props) {

  return (
    <div className="container">
        {props.fields.map((field, i) => <>
            <div className="field">{field}</div>
            <div className='pad'></div>
            <input className='input' onChange={(e) => {
                props.onChangeFunctions[i](getInt(e.target.value, 0))
            }
            }></input>
            <div className='pad'></div>
        </>)}
    </div>
  );
}

export default Device;