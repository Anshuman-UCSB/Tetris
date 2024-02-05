import { useEffect, useState } from "react";
import { registerGame } from "../../api";
import PlayableGame from "../Playable/PlayableGame"
import KeyListener from "../Extras/KeyListener"

function Playable(){
	const [gameId, setGameId] = useState(null);
	const tickDuration = 500; // milliseconds
	
	useEffect(() => {
		const createNewGame = async () => {
			const result = await registerGame();
			console.log("Got game id", result['game_id']);
			setGameId(result['game_id']);
		};
		createNewGame();
	}, []);
	console.log("gameID",gameId);
	return (
		<div className="flex flex-col p-10 space-y-3 w-full h-full items-center">
			<h1 className="font-mono flex-none text-5xl font-extrabold text-slate-200">Taradtris</h1>
			{gameId !== null ? 
				<div className="grow">
					<PlayableGame gameId={gameId}/>
					<KeyListener gameId={gameId}/>
				</div>
				:
				<p className="text-center text-white">Connecting to server...</p>}
		</div>
	);
}

export default Playable;