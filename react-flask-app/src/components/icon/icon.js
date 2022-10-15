import React, { useState, useEffect } from 'react';
import "./icon.css"; 

function Icon(props) {
  return (
    <div className="iconContainer">
        <img className='iconImage' src={props.image} />
        <div className='iconFlex'>
            <div className='iconLabel'>{props.label}</div>
            <div className='iconValue'>{props.value}</div>
        </div>
    </div>
  );
}

export default Icon;