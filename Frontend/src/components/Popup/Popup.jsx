import { useState, useEffect } from "react";
import './Popup.css'
import Single from  "../../../src/assets/single.svg?react"
import Double from  "../../../src/assets/double.svg?react"
import Triple from  "../../../src/assets/triple.svg?react"
import Tetris from  "../../../src/assets/tetris.svg?react"

export default function Popup({ content }) {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000); // Adjust the time for how long you want the popup to be visible (in milliseconds)

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const svgs = {
    "single":<Single className="popup svg"/>,
    "double":<Double className="popup svg"/>,
    "triple":<Triple className="popup svg"/>,
    "tetris!":<Tetris className="popup svg"/>,
  }

  return (
    <div className="container">
      {showPopup && (svgs[content]||<p className="popup">{content}</p>)}
    </div>
  );
}