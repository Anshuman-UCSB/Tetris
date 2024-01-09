import { useEffect, useState } from "react";
import { Square, EmptySquare } from "./Squares";
function Grid({ squares }){

	const grid = [];
	for (let row = 0; row < 20; row++){
		for (let col = 0; col < 10; col++){
			grid.push(<Square key={`${row}-${col}`} color_ind={"O"}/>)
		}
	}
	
	return (
		// <div className="w-full h-full">
			<div className="grid grid-cols-[repeat(10,1fr)] grid-rows-[repeat(20,1fr)]">
				{grid}
			</div>
		// </div>
	)
}

export default Grid;