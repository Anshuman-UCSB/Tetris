import { useEffect, useRef, useState } from "react";
import Grid from "./Grid"

function Game({gameId}){
	const containerRef = useRef(null);

	useEffect(() => {
		const container = containerRef.current;
		if (container) {
			const height = container.clientHeight;
			container.style.width = `${height * 0.5}px`;
		}
	}, []);

	// console.log("height:",window.innerHeight);
	// console.log("width:",width);
	// useEffect(()=>{
	// 	const updateDimensions = () => {
	// 		const aspectRatio = 1;
	// 		setWidth(window.innerHeight * aspectRatio);
	// 	};
	// 	updateDimensions();
	// 	window.addEventListener('resize', updateDimensions);

	// 	return () => {
	// 		window.removeEventListener('resize', updateDimensions);
	// 	};
	// },[])

	return (
	<div ref={containerRef} style={{height: '100%'}} className="inline-block">
		<div className="bg-slate-50 flex h-full">
			<div className="bg-red-300 grow"></div>
			<div className="bg-blue-300 grow-2"><Grid squares={null}/></div>
			<div className="bg-green-300 grow"></div>
		</div>
	</div>
	);
}

export default Game;