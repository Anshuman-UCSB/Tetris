import { useEffect, useRef, useState } from "react";
import Grid from "./Grid"

function Game({gameId}){
	return (
	<div className="h-full">
		<Grid squares={null}/>
	</div>
	// <div className="w-full h-full inline-block">
	// 	<div className="bg-slate-50 flex h-full">
	// 		<div className="bg-red-300 grow"></div>
	// 		<div className="bg-blue-300 grow-2"><Grid squares={null}/></div>
	// 		<div className="bg-green-300 grow"></div>
	// 	</div>
	// </div>
	);
}

export default Game;