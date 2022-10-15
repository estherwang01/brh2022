import React, { useEffect, useState } from 'react';
import './title.css';
import Typed from "react-typed"
import akuna from "../../files/akuna.mp4"
import elephant from "../../files/elephant.mp4"
import omkar from "../../files/omkar.mp4"
import left from "../../files/lefta.png"
import right from "../../files/righta.png"

function Title(props) {

    document.addEventListener('keydown', function(event){
        console.log(event.key); 
        if(event.key == 'ArrowLeft'){
            switchThing(-1); 
        }
        else if(event.key == 'ArrowRight'){
            switchThing(1); 
        }
    }); 

    const [video, setVideo] = useState(0); 
    const strings = [
        ["You're out of touch.", "Hi out of touch. I'm Jerry!", "Hey guess what? You're a Dipshit."], 
        ["Touching grass is sometimes enough.", "No amount of touching grass makes me less of an oblivious fuck", "Guess what I'm the dipshit"],
        ["I just code.", "Call me Qlobal Po!nts!", "AAAAAAAAAAAAAAAAAAAAAAAAAAAA"]
    ]

    useEffect(()=>{
        // if(document.querySelector('video') != null){
        //     document.querySelector('video').playbackRate = .5;
        // }
    }, [video])

    const switchThing = (x) => {
        setVideo((video + x) % 3); 
    }

  return (
    <div className="Title" style={{display: "flex"}}>
        <img src={left} onClick={() => switchThing(-1)} className='but left'/>
        <div className="titleContainer">
        {
            video == 0 && 
            <video autoPlay loop muted className='akuna'>
            <source src={akuna} type="video/mp4"/>
        </video>
        }
        {
            video == 1 && 
            <video autoPlay loop muted className='akuna'>
            <source src={elephant} type="video/mp4"/>
        </video>
        }
        {
            video == 2 && 
            <video autoPlay loop muted className='akuna'>
            <source src={omkar} type="video/mp4"/>
        </video>
        }
        <div  className='cover2'></div>
        {
            video == 0 &&         
            <Typed
            className='typing'
                strings={strings[0]}
                    typeSpeed={80} backSpeed={10}  loop
            />
        }
        {
            video == 1 &&         
            <Typed
            className='typing'
                strings={strings[1]}
                    typeSpeed={80} backSpeed={10}  loop
            />
        }
                {
            video == 2 &&         
            <Typed
            className='typing'
                strings={strings[2]}
                    typeSpeed={80} backSpeed={10}  loop
            />
        }

        <button className={'button titleButton'} onClick={() => props.onClick(video + 1)}>TELL ME MORE!</button>
        </div>
        <img src={right} onClick={() => switchThing(1)} className='but right'/>
    </div>
  );
}

export default Title;