import { useCallback, useRef, useState } from "react";
import { createEmptyGrid, COLS, ROWS, DIRECTIONS } from "../utils/utils";
import { twMerge } from "tailwind-merge";
import { PlayPauseButton } from "./PlayPauseButton";

function Board() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [active, setActive] = useState(false);

  const activeRef = useRef(active);
  activeRef.current = active;

  const runGame = useCallback(() => {
    if (!activeRef.current) {
      return;
    }
    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((arr) => [...arr]);
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          let liveNeighbors = 0;

          DIRECTIONS.forEach(([directionX, directionY]) => {
            const neighborRow = row + directionX;
            const neighborCol = col + directionY;

            if (
              neighborRow >= 0 &&
              neighborRow < ROWS &&
              neighborCol >= 0 &&
              neighborCol < COLS
            ) {
              liveNeighbors += currentGrid[neighborRow][neighborCol] ? 1 : 0;
            }

            if (liveNeighbors < 2 || liveNeighbors > 3) {
              newGrid[row][col] = 0;
            } else if (currentGrid[row][col] === 0 && currentGrid[row][col] === 3) {
              newGrid[row][col] = 1;
            }
          });
        }
      }
      return newGrid;
    });
  }, []);

  return (
    <div className="">
      <div className="flex gap-4 items-center">
        <PlayPauseButton
          active={active}
          onClick={() => {
            setActive(!active);
            if (!active) {
              activeRef.current = true;
            }
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 15px)`,
          gridTemplateRows: `repeat(${ROWS}, 15px)`,
        }}
      >
        {grid.map((rows, originalRowIndex) =>
          rows.map((col, originalColIndex) => (
            <button
              key={`${originalRowIndex}-${originalColIndex}`}
              className={twMerge(
                "border border-white",
                grid[originalRowIndex][originalColIndex]
                  ? "bg-purple-600"
                  : "bg-slate-900"
              )}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Board;
