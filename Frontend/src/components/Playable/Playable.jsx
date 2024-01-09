import { useEffect, useState } from "react";
import { registerGame } from "../../api";
import Game from "../Game/Game"

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
		<div className="flex flex-col p-3 space-y-3 w-full h-full items-center">
			<h1 className="font-mono flex-none text-5xl font-extrabold text-slate-200">Taradtris</h1>
			{gameId ? 
				<div className="grow">
					<Game gameId={gameId}/>
				</div>
				:
				<p className="text-center">Connecting to server...</p>}
		</div>
	);
}

export default Playable;