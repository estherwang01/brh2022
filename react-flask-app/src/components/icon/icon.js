import React, { useState, useEffect } from 'react';
import "./icon.css"; 

function Icon(props) {
  return (
    <div className="iconContainer">
        <img className='iconImage' src={props.img} />
        {/* <div className='iconFlex'> */}
            <div className='iconLabel'>{props.label + ": " + props.value.toFixed(2)}</div>
            {/* <div className='iconValue'>{props.value.toFixed(2)}</div> */}
        {/* </div> */}
    </div>
  );
}

export default Icon;