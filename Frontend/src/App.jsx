import { useState, useEffect, useCallback } from 'react'
import Grid from './Grid.jsx'
import './App.css'

function App() {
  const [gameId, setGameId] = useState(null);
  const [squares, setSquares] = useState(Array(20).fill(Array(10).fill("bg")));
  const [alive, setAlive] = useState(true)
  const backend_url = 'http://localhost:8000/';
  const updateGrid = (data) => {
    const nextSquares = squares.map(row => [...row]);
    for(let y = 0;y<20;y++){
      for(let x = 0;x<10;x++){
        nextSquares[y][x] = data.game.grid[y][x][1];
      }
    }
    setSquares(nextSquares);
    console.log(data.game)
    setAlive(data.game.alive);
  }
  
  const request = async (endpoint, data) => {
      try {
        const response = await fetch(backend_url+endpoint, data);
        return response.json();
      } catch (err) {
        console.log("err: ",err);
      }
  }

  const tickDuration = 500 // milliseconds 
  useEffect(() => {
    const createNewGame = async () => {
      const data = await request("game", {method: "PUT"})
      console.log("setting game id", data.game_id)
      setGameId(data.game_id);
    };
    createNewGame();
  }, []);

  const fetchData = useCallback(async (tick) =>  {
    if(gameId === null){
      console.log("not fetching null game");
      return null;
    }
    const data = await request(`${tick ? "tick":"game"}?game_id=${gameId}`, {})
    updateGrid(data);
  }, [gameId]);

  const makeAction = useCallback(async (action) =>  {
    if(gameId === null){
      console.log("not acting on null game");
      return null;
    }
    const data = await request(`action?game_id=${gameId}&action=${action}`, {method: "PUT"})
    updateGrid(data);
  }, [gameId]);

  useEffect(() => {
    console.log("fetching game "+gameId);
    fetchData(false);
    
    window.addEventListener('keydown', handleKeyDown);
    const handleTick = () => {
      fetchData(true)
    }

    const intervalId = setInterval(handleTick, tickDuration);
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameId]);

  const handleKeyDown = (event) => {
    console.log(gameId);
    console.log("event pressed: "+event.key+" and "+event.keyCode);

    if (event.key === "ArrowLeft" || event.keyCode === 37){
      console.log("Left pressed");
      makeAction(3);
    }
    if (event.key === "ArrowRight" || event.keyCode === 39){
      console.log("Right pressed");
      makeAction(1);
    }
    if (event.key === "ArrowDown" || event.keyCode === 40){
      console.log("Down pressed");
      fetchData(true);
    }
    if (event.key === "ArrowUp" || event.keyCode === 38){
      console.log("Up pressed");
    }
    if (event.keyCode === 32){
      console.log("Spacebar pressed");
      makeAction(0);
    }
  };


  return (
    <>
      <h1>Tetris</h1>
      {alive && <Grid squares = {squares}/>}
      {
        !alive && <p>YOU LOSE</p>
      }
    </>
  )
}

export default App
