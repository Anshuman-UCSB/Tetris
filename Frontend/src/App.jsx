import { useState, useEffect, useCallback } from "react";
import Grid from "./components/Grid/Grid";
import NextPiece from "./components/NextPiece/NextPiece";
import StoredPiece from "./components/StoredPiece/StoredPiece";
import "./App.css";
import PausedModal from "./components/Extras/PausedModal.jsx";
import Popup from "./components/Popup/Popup.jsx";

function App() {
  const [gameId, setGameId] = useState(null);
  const [gameNum, setGameNum] = useState(0);
  const [squares, setSquares] = useState(Array(20).fill(Array(10).fill("bg")));
  const [alive, setAlive] = useState(true);
  const [stored, setStored] = useState(null);
  const [paused, setPaused] = useState(false)
  const [score, setScore] = useState(0);
  const [messages, setMessages] = useState({});
  const [nextPieces, setNextPieces] = useState([]);
  const [pressedKeys, setPressedKeys] = useState({});
  const [keyFlags, setKeyFlags] = useState(Array(42).fill(false));

  const backend_url = "http://localhost:8000/";
  const tickDuration = 500; // milliseconds
  const keyPollDuration = 50; // milliseconds
  const updateGrid = (data) => {
    const nextSquares = squares.map((row) => [...row]);
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 10; x++) {
        nextSquares[y][x] = data.game.grid[y][x][1];
      }
    }
    setSquares(nextSquares);
    setAlive(data.game.alive);
    setScore(data.game.score);
    setNextPieces(data.game.nextPieces);
    setStored(data.game.stored);
    Object.keys(data.game.messages).forEach(function(key, index) {
      let content = data.game.messages[key];
      data.game.messages[key] = <Popup key={key} content={content}/>
    });
    setMessages(data.game.messages);
  };
  const request = async (endpoint, data) => {
    try {
      const response = await fetch(backend_url + endpoint, data);
      return response.json();
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const fetchData = useCallback(
    async (tick) => {
      if (gameId === null) {
        console.log("not fetching null game");
        return null;
      }
      const data = await request(
        `${tick ? "tick" : "game"}?game_id=${gameId}`,
        {}
      );

      updateGrid(data);
    },
    [gameId]
  );

  const makeAction = useCallback(
    async (action) => {
      if (gameId === null) {
        console.log("not acting on null game");
        return null;
      }
      const data = await request(`action?game_id=${gameId}&action=${action}`, {
        method: "PUT",
      });
      updateGrid(data);
    },
    [gameId]
  );

  useEffect(() => {
    const createNewGame = async () => {
      const data = await request("game", { method: "PUT" });
      console.log("setting game id", data.game_id);
      setGameId(data.game_id);
    };
    createNewGame();
  }, [gameNum]);

  useEffect(() => {
    console.log("fetching game " + gameId);
    fetchData(false);

    if (alive) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
    }
    const handleTick = () => {
      if (alive && !paused) {
        fetchData(true);
      };
    };
    const intervalId = setInterval(handleTick, tickDuration);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameId, alive, paused]);

  useEffect(() => {
    const handleInputs = () => {
      if (pressedKeys[37] || keyFlags[37]) {
        makeAction(3);
        keyFlags[37] = false;
      } else if (pressedKeys[39] || keyFlags[39]) {
        makeAction(1);
        keyFlags[39] = false;
      } else if (pressedKeys[40] || keyFlags[40]) {
        fetchData(true);
        keyFlags[40] = false;
      }
    };
    const intervalId = setInterval(handleInputs, keyPollDuration);
    return () => {
      clearInterval(intervalId);
    };
  }, [pressedKeys]);

  const handleKeyUp = (event) => {
    setPressedKeys((prev) => ({ ...prev, [event.keyCode]: false }));
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape" || event.keyCode === 27) {
      setPaused(!paused);
    }
    if (paused) return;
    if (event.repeat) return;
    // console.log("event pressed: " + event.key + " and " + event.keyCode);

    if ([37, 39, 40].includes(event.keyCode)) {
      setPressedKeys((prev) => ({ ...prev, [event.keyCode]: true }));
      const newFlags = keyFlags.slice();
      newFlags[event.keyCode] = true;
      setKeyFlags(newFlags);
    }

    if (event.key === "ArrowUp" || event.keyCode === 38) {
      makeAction(0);
    }
    if (event.keyCode === 32) {
      makeAction(4);
    }
    if (event.key === "Shift" || event.keyCode === 16) {
      makeAction(5);
    }
    
  };

  return (
    <>
      <h1>tARADtris</h1>
      <PausedModal show={paused}/>
      {alive && (
        <div className="game-container">
          <div>
            <StoredPiece piece={stored} />
            <p>Score: {score}</p>
            {Object.values(messages)}
          </div>
          <Grid squares={squares} dims={[10, 20]} />
          <NextPiece nextPieces={nextPieces} />
        </div>
      )}
      {!alive && (
        <>
          <p>YOU LOSE</p>
          <button onClick={() => setGameNum(gameNum + 1)}>Play Again</button>
        </>
      )}
    </>
  );
}

export default App;
