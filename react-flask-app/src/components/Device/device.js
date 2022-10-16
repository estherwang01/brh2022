import React from 'react';
import "./device.css"; 
import { getInt } from "../../util"; 

function Device(props) {

  return (
    <div className="container">
        {props.fields.map((field, i) => <>
            <div className="field">{field}</div>
            <div className='pad'></div>
            {props.type[i] === 'input' ? 
            <input className='input' onChange={(e) => {
                props.onChangeFunctions[i](getInt(e.target.value, 0))
            }
            }></input> : 
            <select onChange={(e) => {
              props.onChangeFunctions[i](e.target.value)}}>
              {
                props.dropdowns[i].map((e,_) => <option>{e}</option>)
              }
            </select>
          }
            <div className='pad'></div>
        </>)}
    </div>
  );
}

export default Device;