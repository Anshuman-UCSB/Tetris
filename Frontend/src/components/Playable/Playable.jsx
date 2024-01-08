import { useEffect, useState } from "react";
import { registerGame } from "../../api";

function Playable(){
	const [gameId, setGameId] = useState(null);
	
	useEffect(() => {
		const createNewGame = async () => {
			const result = await registerGame();
			console.log(result);
			setGameId(result['game_id']);
		};
		createNewGame();
	}, []);

	return (
		<div>
			<h1 className="font-mono text-5xl text-center font-extrabold">Tetris</h1>
			<p>game id: {gameId || "null"}</p>
		</div>
	);
}

export default Playable;