import { useEffect, useRef, useState } from "react";
import { fetchGame } from "../../api";
import Grid from "./Grid";
import NextPiece from "./NextPiece";

function Game({game}){
	console.log("game is ",game);
	return (
		<div className="flex grow h-full gap-2">
			<NextPiece nextPieces={game.nextPieces}/>
			<Grid squares={game.grid.map((r,i)=>(r.map((v,j)=>(v[1]))))}/>
		</div>
	);
}

export default Game;