import { useState, useEffect } from 'react'
import Grid from './Grid.jsx'
import './App.css'
import { preinit } from 'react-dom';

function Error( { error }) {
  return (
    <>
      {error && <p className='error-msg'>Error: {error}</p>}
    </>
  );
}
function Debug( { debug }) {
  return (
    <>
      {debug && <p>Debug: {String(debug)}</p>}
    </>
  );
}


function App() {
  const [gameId, setGameId] = useState(null);
  const [squares, setSquares] = useState(Array(20).fill(Array(10).fill(0)));
  let error = null;
  let debug = null;
  const backend_url = 'http://localhost:8000/';
  useEffect(() => {
    const createNewGame = async () => {
      try {
        const response = await fetch(backend_url+"game", {method: "PUT"});
        const data = await response.json();
        setGameId(data['game_id']);
      } catch (err) {
        error = err.message;
      }
    };
    createNewGame();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if(gameId === null){
          console.log("not fetching null game");
          return null;
        }
        const response = await fetch(backend_url+`game?game_id=${gameId}`);
        console.log("fetching with gameId",gameId);
        const data = await response.json();
        const nextSquares = squares.slice();
        for(let y = 0;y<20;y++){
          for(let x = 0;x<10;x++){
            // console.log(x,y);
            nextSquares[y][x] = data['game']['grid'][y][x][1];
          }
        }
        console.log("next:",nextSquares);
        console.log("data:",data);
        setSquares(nextSquares);
      } catch (err) {
        console.log("err: ",err);
        error = err.message;    
      }
    }
    fetchData();
  }, [gameId]);

  const handleKeyDown = (event) => {
    // console.log("event pressed: "+event.key+" and "+event.keyCode);
    if (event.key === "ArrowLeft" || event.keyCode === 37){
      console.log("Left pressed");
    }
    if (event.key === "ArrowRight" || event.keyCode === 39){
      console.log("Right pressed");
    }
    if (event.key === "ArrowDown" || event.keyCode === 40){
      console.log("Down pressed");
    }
    if (event.key === "ArrowUp" || event.keyCode === 38){
      console.log("Up pressed");
    }
    // setDebug("test");
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <>
      <h1>Tetris</h1>
      <Grid squares = {squares}/>
      <Error error = {error} />
      <Debug debug = {debug} />
    </>
  )
}

export default App
