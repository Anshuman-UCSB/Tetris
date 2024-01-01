import { useState, useEffect } from "react";
import './Popup.css'

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

  return (
    <div className="container">
      {showPopup && <p className="popup">{content}</p>}
    </div>
  );
}