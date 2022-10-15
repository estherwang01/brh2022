import React, { useState, useEffect } from 'react';
import './App.css';
import Title from './title';
import Calculate from './calculate';
import Jackson from './jackson';

function App() {
  const [view, setView] = useState(0); 

  return (
    <div className="App">
      {view == 0 &&<Title onClick={setView}/>}
      {view == 1 && <Calculate />}
      {view == 2 && <Jackson/>}
    </div>
  );
}

export default App;




