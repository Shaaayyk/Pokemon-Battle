import { useEffect, useState } from "react";
import { useOutletContext, useLocation, useNavigate } from "react-router-dom";

export default function GameOver() {
  const [gameOverStatus, setGameOverStatus] = useState(null);
  const [
    partnerPoke,
    wildPoke,
    setCurrentMenu,
  ] = useOutletContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("defeat")) {
      setGameOverStatus("defeat");
    } else {
      setGameOverStatus("victory");
    }
  }, [location]);

  function handleClick() {
    setCurrentMenu(null)
    navigate("/gameboy")
  }

  return (
    <>
      {gameOverStatus === "defeat" ? (
        <div id="gameOverContainer">
          <p className="message">
            So sorry you lost! Would you like to try again?
          </p>
          <p className="arrow" onClick={() => handleClick()}>
            &#9660;
          </p>
        </div>
      ) : (
        <div id="gameOverContainer">
          <p className="message">
            Nicely done! You won!! Would you like to try again?
          </p>
          <p className="arrow" onClick={() => handleClick()}>
            &#9660;
          </p>
        </div>
      )}
    </>
  );
}
