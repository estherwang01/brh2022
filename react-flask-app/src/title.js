import React from 'react';
import './title.css';
import Typed from "react-typed"

function Title(props) {
  return (
    <div className="Title">
        <div className="titleContainer">
        <Typed
        className='typing'
            strings={["You're out of touch.", "Hi out of touch. I'm Jerry!"]}
                typeSpeed={80} backSpeed={10}  loop
        />
        <button className='button' onClick={() => props.onClick(1)}>TELL ME MORE!</button>
        </div>

    </div>
  );
}

export default Title;