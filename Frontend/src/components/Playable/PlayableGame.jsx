import { useEffect, useRef, useState } from "react";
import { fetchGame } from "../../api";
import Game from "../Game/Game";

function PlayableGame({gameId}){
	// const [squares, setSquares] = useState(Array(20).fill(Array(10).fill('bg')))
	const [game, setGame] = useState({grid:Array(20).fill(Array(10).fill('bg')), nextPieces: []});

	console.log("Game id in game is",gameId);
	// console.log("squares is",squares);
	useEffect(()=>{
		const getGame = async (gameId) =>{
			const result = await fetchGame(gameId);
			console.log("fetched data",result);
			setGame(result.game);
			// setSquares(result.game.grid.map((r,i)=>(r.map((v,j)=>(v[1])))));
		}
		getGame(gameId);
	},[gameId])

	return (
		<>
			<Game game={game}/>
		</>
	);
}

export default PlayableGame;