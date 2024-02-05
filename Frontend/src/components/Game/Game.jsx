import Grid from "./Grid";
import NextPiece from "./NextPiece";
import StoredPiece from "./StoredPiece";

function Game({game}){
	console.log("game is ",game);
	return (
		<div className="flex grow h-full gap-2">
			<StoredPiece nextPieces={game.stored}/>
			<Grid squares={game.grid.map((r,i)=>(r.map((v,j)=>(v[1]))))}/>
			<NextPiece nextPieces={game.nextPieces}/>
		</div>
	);
}

export default Game;