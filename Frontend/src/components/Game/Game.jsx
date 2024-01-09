import { useState } from "react";

function Game({width, height}){
	const [gameId, setGameId] = useState(null);
	return (<div style={{width, height}} className="bg-slate-50 flex">
		<div className="bg-red-300 grow"></div>
		<div className="bg-blue-300 grow-2"></div>
		<div className="bg-green-300 grow"></div>
	</div>);
}

export default Game;