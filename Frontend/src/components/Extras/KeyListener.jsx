import { useEffect, useState } from "react";

function KeyListener( { gameId }){
	const [pressedKeys, setPressedKeys] = useState({});
	const [keyFlags, setKeyFlags] = useState(Array(42).fill(false));
	const [paused, setPaused] = useState(false)
	const keyPollDuration = 50; // milliseconds

	const callback = (i)=>{
		console.log("callback on",i);
	}

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	useEffect(() => {
		const handleInputs = () => {
			if (pressedKeys[37] || keyFlags[37]) {
				callback(3);
				keyFlags[37] = false;
			} else if (pressedKeys[39] || keyFlags[39]) {
				callback(1);
				keyFlags[39] = false;
			} else if (pressedKeys[40] || keyFlags[40]) {
				callback(2);
				keyFlags[40] = false;
			}
		};
		const intervalId = setInterval(handleInputs, keyPollDuration);
		return () => {
			clearInterval(intervalId);
		};
	}, [pressedKeys]);

	const handleKeyUp = (event) => {
		setPressedKeys((prev) => ({ ...prev, [event.keyCode]: false }));
	};
	const handleKeyDown = (event) => {
		if (event.key === "Escape" || event.keyCode === 27) {
			setPaused(!paused);
		}
		if (paused) return;
		if (event.repeat) return;
		// console.log("event pressed: " + event.key + " and " + event.keyCode);

		if ([37, 39, 40].includes(event.keyCode)) {
			setPressedKeys((prev) => ({ ...prev, [event.keyCode]: true }));
			const newFlags = keyFlags.slice();
			newFlags[event.keyCode] = true;
			setKeyFlags(newFlags);
		}

		if (event.key === "ArrowUp" || event.keyCode === 38) {
			callback(0);
		}
		if (event.keyCode === 32) { // space?
			callback(4);
		}
		if (event.key === "Shift" || event.keyCode === 16) {
			callback(5);
		}
		
	};
	return <></>;
}

export default KeyListener;