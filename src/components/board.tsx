import { useState } from "react";
import { createEmptyGrid, COLS, ROWS } from "../utils/utils";
import { twMerge } from "tailwind-merge";

function Board() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [active, setActive] = useState(false)
  return (
    <div className="">
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
