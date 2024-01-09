import { useEffect, useState } from "react";

function Game({gameId, height}){
	const [width, setWidth] = useState(1000);

	useEffect(()=>{
		const updateDimensions = () => {
			const aspectRatio = 1/1;
			setWidth(window.innerHeight * aspectRatio);
		};
		updateDimensions();
		window.addEventListener('resize', updateDimensions);

		return () => {
			window.removeEventListener('resize', updateDimensions);
		};
	},[])

	return (
	<div style={{width, height}} className="inline-block">
		<div className="bg-slate-50 flex h-full">
			<div className="bg-red-300 grow"></div>
			<div className="bg-blue-300 grow-2"></div>
			<div className="bg-green-300 grow"></div>
		</div>
	</div>
	);
}

export default Game;