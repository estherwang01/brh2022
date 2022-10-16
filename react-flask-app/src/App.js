import React, { useState } from 'react';
import './App.css';
import Title from './pages/title/title';
import Calculate from './pages/laptop/calculate';
import Jackson from './pages/Spotify/jackson';
import Omkar from './pages/laptop/omkar';
import left from "./files/lefta.png"; 

function App() {
  const [view, setView] = useState(0); 

  return (
    <div className="App">
      {view === 0 &&<Title onClick={setView}/>}
      {view === 1 && <Calculate />}
      {view === 2 && <Jackson/>}
      {view === 3 && <Omkar/>}
      {view !== 0 && <img src={left} style={{position: "absolute", top: "-200px", left:"-210px", zIndex:'100', transform: 'scale(0.1)'
          }} onClick={() => setView(0)}/>}

    </div>
  );
}

export default App;




