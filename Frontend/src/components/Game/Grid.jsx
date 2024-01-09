import { useEffect, useState } from "react";
import { Square, EmptySquare } from "./Squares";
function Grid({ squares }){

	const grid = [];
	for (let row = 0; row < 20; row++){
		const r = [];
		for (let col = 0; col < 10; col++){
			r.push(<Square key={`${row}-${col}`} color_ind={"IOLZ"[Math.floor(Math.random() * 4)]}/>);
		}
		grid.push(<div className="flex">
			{r}
		</div>);
	}
	
	return (
		<div className="w-[40vh] h-full">
			{grid}
		</div>
	)
}

export default Grid;