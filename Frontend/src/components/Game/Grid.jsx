import { useEffect, useState } from "react";
import { Square, EmptySquare } from "./Squares";
function Grid({ squares }){

	const grid = [];
	for (let row = 0; row < 20; row++){
		// const r = [];
		// for (let col = 0; col < 10; col++){
		// 	r.push(<Square key={`${row}-${col}`} color_ind={squares[row][col]}/>);
		// }
		// grid.push(<div key={`${row}`} className="flex">
		// 	{r}
		// </div>);
		for (let col = 0; col < 10; col++){
			grid.push(<Square key={`${row}-${col}`} color_ind={squares[row][col]}/>);
		}
	}
	
	return (
		<div className="flex items-center justify-center h-full">
			<div className="grid grid-cols-10 gap-0 aspect-[1/2] h-full">
				{grid}
			</div>
		</div>
	)
}

export default Grid;