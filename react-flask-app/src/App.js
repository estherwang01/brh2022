import React, { useState, useEffect } from 'react';
import './App.css';
import Title from './title';
import Calculate from './calculate';

function App() {
  const [view, setView] = useState(0); 

  return (
    <div className="App">
      {view == 0 &&<Title onClick={setView}/>}
      {view == 1 && <Calculate />}
    </div>
  );
}

export default App;




