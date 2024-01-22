import { useEffect, useRef, useState } from "react";
import { fetchGame } from "../../api";
import Grid from "./Grid";
import NextPiece from "./NextPiece";

function Game({game}){
	console.log("game is ",game);
	return (
		<div className="flex h-full">
			{/* <NextPiece nextPieces={game.nextPieces}/> */}
			<h1 className="font-mono flex-none text-5xl font-extrabold text-slate-200">Taradtris</h1>
			<Grid squares={game.grid.map((r,i)=>(r.map((v,j)=>(v[1]))))}/>
		</div>
	);
}

export default Game;