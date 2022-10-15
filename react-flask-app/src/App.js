import React, { useState, useEffect } from 'react';
import './App.css';
import Title from './pages/title/title';
import Calculate from './pages/laptop/calculate';
import Jackson from './pages/Spotify/jackson';
import Omkar from './pages/laptop/omkar';

function App() {
  const [view, setView] = useState(0); 

  return (
    <div className="App">
      {view == 0 &&<Title onClick={setView}/>}
      {view == 1 && <Calculate />}
      {view == 2 && <Jackson/>}
      {view == 3 && <Omkar/>}
    </div>
  );
}

export default App;




