import { useState, useEffect } from 'react'
import Grid from './Grid.jsx'
import './App.css'

function App() {
  const [gameId, setGameId] = useState(null);
  const [squares, setSquares] = useState(Array(20).fill(Array(10).fill("bg")));
  const backend_url = 'http://localhost:8000/';

  const updateGrid = (data) => {
    const nextSquares = squares.map(row => [...row]);
    for(let y = 0;y<20;y++){
      for(let x = 0;x<10;x++){
        nextSquares[y][x] = data['game']['grid'][y][x][1];
        console.log(x,y,data['game']['grid'][y][x], nextSquares[y][x]);
      }
      console.log("next:",nextSquares[0][0]);
    }
    
    console.log("data:",data);
    setSquares(nextSquares);
  }
  
  const request = async (endpoint, data) => {
      try {
        const response = await fetch(backend_url+endpoint, data);
        return response.json();
      } catch (err) {
        console.log("err: ",err);
      }
  }

  useEffect(() => {
    const createNewGame = async () => {
      const data = await request("game", {method: "PUT"})
      setGameId(data['game_id']);
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
        updateGrid(data);
      } catch (err) {
        console.log("err: ",err);
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
    </>
  )
}

export default App
