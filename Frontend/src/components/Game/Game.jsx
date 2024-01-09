import { useEffect, useRef, useState } from "react";
import { fetchGame } from "../../api";
import Grid from "./Grid"

function Game({gameId}){
	const [squares, setSquares] = useState(Array(20).fill(Array(10).fill('bg')))
	console.log("Game id in game is",gameId);
	console.log("squares is",squares);
	useEffect(()=>{
		const getGame = async (gameId) =>{
			const result = await fetchGame(gameId);
			console.log("fetched data",result);
			setSquares(result.game.grid.map((r,i)=>(r.map((v,j)=>(v[1])))));
		}
		getGame(gameId);
	},[gameId])
	return (
	<div className="h-full">
		<Grid squares={squares}/>
	</div>
	);
}

export default Game;