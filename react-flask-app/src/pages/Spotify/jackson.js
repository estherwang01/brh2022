import React from 'react';
import '../../App.css';
import arrow from "../../files/arrow.png"; 
import yes from "../../files/yes.jpg"; 
import no from "../../files/no.jpg"; 

function Jackson() {
  // const [view, setView] = useState(0); 

  return (
    <div className="App">
      <div className='title2' style={{top: "10%", position: "relative"}}>Let me find a Spotify playlist for you. </div>
      <div className='title' style={{top: "10%", position: "relative"}}>Is touching grass enough?</div>
      <div style={{width: "100%", justifyContent: "center"}}>
        <div style={{display:"flex", margin: "auto", width: "fit-content"}}>
          <div className='title2' style={{top: "300px", left:"450px", position: "absolute"}}>Yes</div>
          <img alt="" src={arrow} style={{transform:"rotate(-145deg) scale(.6)"}}/>
          <img alt="" src={arrow} style={{transform:"rotate(145deg) scale(0.6)"}}/>
          <div className='title2' style={{top: "300px", right:"450px", position: "absolute"}}>No</div>
        </div>
        <div style={{marginTop: "-100px"}}>
            <a href='https://open.spotify.com/playlist/477giD52Poyw3hVzFKXjHY' target="_blank" rel="noreferrer">
              <img alt="" src={yes} style={{left: "320px", width:"200px", position: "absolute"}}/>
            </a>
          <a href='https://open.spotify.com/playlist/1EbsEZUl2jYURerJERuDqA' target="_blank" rel="noreferrer">
          <img  alt="" src={no} style={{right: "320px", width:"200px", position: "absolute"}}/>
            </a>
        </div>
      </div>
    </div>
  );
}

export default Jackson;




