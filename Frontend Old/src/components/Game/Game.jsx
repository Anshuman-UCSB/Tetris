import './Game.css'
import Grid from "../Grid/Grid";
import NextPiece from "../NextPiece/NextPiece";
import StoredPiece from "../StoredPiece/StoredPiece";

function Game(stored, score, messages, squares, nextPieces) {
  return <div className="game-container">
    <div>
      <StoredPiece piece={stored} />
      <p>Score: {score}</p>
      {Object.values(messages)}
    </div>
    <Grid squares={squares} dims={[10, 20]} />
    <NextPiece nextPieces={nextPieces} />
  </div>;
}

export default Game;