import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import "../styles/PlayPauseButtom.css"; // Asegúrate de que este archivo exista

export function PlayPauseButton({
  onClick,
  active,
}: {
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      className={`play-pause-button ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {active ? (
        <BsFillPauseFill className="icon" />
      ) : (
        <BsFillPlayFill className="icon" />
      )}
    </button>
  );
}
