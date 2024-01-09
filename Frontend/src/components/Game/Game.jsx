import { useState } from "react";

function Game({width, height}){
	const [gameId, setGameId] = useState(null);
	return (
	<div className="inline-block w-full h-full">
		<div className="bg-slate-50 flex w-14 h-14">
			<div className="bg-red-300 grow"></div>
			<div className="bg-blue-300 grow-2"></div>
			<div className="bg-green-300 grow"></div>
		</div>
	</div>
	);
}

export default Game;