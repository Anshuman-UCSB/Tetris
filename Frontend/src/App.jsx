import { useState, useEffect, useCallback } from 'react'
import Grid from './Grid'
import NextPiece from './Nextpiece'
import './App.css'

function App() {
  const [gameId, setGameId] = useState(null);
  const [squares, setSquares] = useState(Array(20).fill(Array(10).fill("bg")));
  const [alive, setAlive] = useState(true)
  const [nextPiece, setNextPiece] = useState("")
  const [pressedKeys, setPressedKeys] = useState({});
  const [keyFlags, setKeyFlags] = useState(Array(42).fill(false));

  const backend_url = 'http://localhost:8000/';
  const tickDuration = 500 // milliseconds 
  const keyPollDuration = 50 // milliseconds 

  const updateGrid = (data) => {
    const nextSquares = squares.map(row => [...row]);
    for(let y = 0;y<20;y++){
      for(let x = 0;x<10;x++){
        nextSquares[y][x] = data.game.grid[y][x][1];
      }
    }
    setSquares(nextSquares);
    setAlive(data.game.alive);
    setNextPiece(data.game.nextPieces[0])
  }
  
  const request = async (endpoint, data) => {
      try {
        const response = await fetch(backend_url+endpoint, data);
        return response.json();
      } catch (err) {
        console.log("err: ",err);
      }
  }

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
    const createNewGame = async () => {
      const data = await request("game", {method: "PUT"})
      console.log("setting game id", data.game_id)
      setGameId(data.game_id);
    };
    createNewGame();
  }, []);
  
  useEffect(() => {
    console.log("fetching game "+gameId);
    fetchData(false);
    
    if(alive){
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
    const handleTick = () => {
      if (alive) fetchData(true)
    }

    const intervalId = setInterval(handleTick, tickDuration);
    return () => {
      clearInterval(intervalId)
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameId, alive, nextPiece]);

  useEffect(() => {
    const handleInputs = () => {
      console.log("inputs:", pressedKeys)
      if (pressedKeys[37] || keyFlags[37]){
        makeAction(3);
        keyFlags[37] = false;
      } else if (pressedKeys[39] || keyFlags[39]){
        makeAction(1);
        keyFlags[39] = false;
      } else if (pressedKeys[40] || keyFlags[40]){
        fetchData(true);
        keyFlags[40] = false;
      }
    };
    const intervalId = setInterval(handleInputs, keyPollDuration);
    return () => {
      clearInterval(intervalId);
    }
  }, [pressedKeys]);

  const handleKeyUp = (event) => {
    setPressedKeys((prev) => ({...prev, [event.keyCode]: false}));
  }
  const handleKeyDown = (event) => {
    if(event.repeat) return
    console.log("event pressed: "+event.key+" and "+event.keyCode);

    if ([37,39,40].includes(event.keyCode)){
      setPressedKeys((prev) => ({ ...prev, [event.keyCode]:true }));
      const newFlags = keyFlags.slice();
      newFlags[event.keyCode]=true;
      setKeyFlags(newFlags);
    }
    if (event.key === "ArrowLeft" || event.keyCode === 37){
      console.log("Left pressed");
      // makeAction(3);
    }
    if (event.key === "ArrowRight" || event.keyCode === 39){
      console.log("Right pressed");
      if(!pressedKeys[event.keyCode])
        setPressedKeys((prev) => ({ ...prev, [event.keyCode]:true }));
      // makeAction(1);
    }
    if (event.key === "ArrowDown" || event.keyCode === 40){
      console.log("Down pressed");
      // fetchData(true);
      if(!pressedKeys[event.keyCode])
        setPressedKeys((prev) => ({ ...prev, [event.keyCode]:true }));
    }
    if (event.key === "ArrowUp" || event.keyCode === 38){
      console.log("Up pressed");
      makeAction(0);
    }
    if (event.keyCode === 32){
      console.log("Spacebar pressed");
      makeAction(4);
    }
  };


  return (
    <>
      <h1>tARADtris</h1>
      {
        alive && <div className="game-container">
          <Grid squares = {squares}/>
          <NextPiece nextPiece={nextPiece} />
        </div>
      }
      {
        !alive && <p>YOU LOSE</p>
      }
    </>
  )
}

export default App
