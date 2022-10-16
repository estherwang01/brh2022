import React, {useState} from 'react';
import '../../App.css';
import arrow from "../../files/arrow.png"; 
import yes from "../../files/yes.jpg"; 
import no from "../../files/no.jpg"; 

function Jackson() {
  const [view, setView] = useState(0); 
  const [url, setUrl] = useState(""); 
  const [stuff, setStuff] = useState(<div></div>); 

  const getJetString = (jets) => {
    if(jets.length === 0) {
      return "Congratulations! None of these artists fly private jets! Bar is on the floor but at least you've cleared it."
    } else{
      let s = "Unfortunately, there are private jet user(s) on this playlist. Get better. Stop listening to: " 
      jets.array.forEach(element => {
        s += element + ", "; 
      });
      return s.substring(0, s.length-1); 
    }
  }
  const getData = async (url) => {
    await fetch("").then(response => response.json()).then(d => {
      if(!d["success"]){
        setStuff(<div className='title2'>Error getting data. Are you sure that link is correct?</div>)
      }else{
        setStuff(
          <div>
            <div style={{width: "300px", height: "300px", backgroundColor:"white", opacity:".5"}}>
              <div className='title'>{d["carbondioxide"]}</div>
              <div className='title2'>pounds CO2 impact / year</div>
            </div>
            <div className='title2'>
              {getJetString(d["privatejetters"])}
            </div>
            <div className='title2'>{d["message"]}</div>
          </div>
        )
      }
    }); 
  }

  if (view === 1){ 
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
  ) } else {
    return (
      <div className='app'>
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translate(-50%, 0)" }}>
          <div style={{ display: "flex", width: "fit-content", margin: "auto" }}>
            <div className='title2'>Enter a Spotify Playlist:</div><input className='input' onChange={(e)=>{
              setUrl(e.target.value); 
            }}></input>
          </div>
          <button className='button' onClick={() => { getData(); 
          }}>i'm ready to touch some grass</button>
        </div>
        <div>{stuff}</div>
      </div>
    )
  }
}

export default Jackson;




