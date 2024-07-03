import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

export function PlayPauseButton({onClick, active}: {onClick: () => void, active:boolean}) {
    return (
        <button
        className={twMerge("transition ease-in-out flex items-center justify-center h-8 w-8 rounded-full shadow-md",
            active ? "bg-gray-300 hover:bg-gray-400" : "bg-green-400 hover:bg-green-500"
        )}
        onClick={onClick}>
            {
                active ? <BsFillPauseFill className="h-6 w-6"/> : <BsFillPlayFill className="h-6 w-6"/>
            }
        </button>
    )
}