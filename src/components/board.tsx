import { useCallback, useEffect, useRef, useState } from "react";
import { createEmptyGrid, COLS, ROWS, DIRECTIONS } from "../utils/utils";
import { twMerge } from "tailwind-merge";
import { PlayPauseButton } from "./PlayPauseButton";
import { Button } from "./Button";

function Board() {
  const [grid, setGrid] = useState<number[][]>(createEmptyGrid());
  const [active, setActive] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const getGridSize = () => {
    const size = Math.min(
      (window.innerHeight - 200) / ROWS,
      (window.innerWidth - 32) / COLS,
      15
    )
    return size
  }


  const [cellSize, setSize] = useState(getGridSize())

  useEffect(() => {
    const handleResize = () => {
      setSize(getGridSize())
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []
  ) 



  const activeRef = useRef(active);
  activeRef.current = active;

  const runGame = useCallback(() => {
    // console.log("Estacorriendo")
    if (!activeRef.current) {
      return;
    }
    setGrid((currentGrid) => {
      const newGrid = currentGrid.map((arr) => [...arr]);
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          // console.log(`fila ${row}, columna ${col}`)
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
          });

          if (liveNeighbors < 2 || liveNeighbors > 3) {
            newGrid[row][col] = 0;
          } else if (currentGrid[row][col] === 0 && liveNeighbors === 3) {
            newGrid[row][col] = 1;
          }
        }
      }
      return newGrid;
    });
    setTimeout(runGame, 200);
  }, [activeRef, setGrid]);

  const handleMouseDown = () => {
    setMouseDown(true);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  const handleToggle = (row: number, col: number) => {
    if (mouseDown) {
      toggleCell(row, col);
    }
  };

  const toggleCell = (rowToToggle: number, colToToggle: number) => {
    const newGrid = grid.map((row, rowIndex) =>
      row.map((cell, colIndex) =>
        rowIndex === rowToToggle && colIndex === colToToggle
          ? cell
            ? 0
            : 1
          : cell
      )
    );
    setGrid(newGrid);
  };

  return (
    <>
      <h1 className="text-xl">Conway's Game of Life</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${ROWS}, ${cellSize}px)`,
        }}
      >
        {grid.map((rows, originalRowIndex) =>
          rows.map((col, originalColIndex) => (
            <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseEnter={() => {
                handleToggle(originalRowIndex, originalColIndex);
              }}
              key={`${originalRowIndex}-${originalColIndex}`}
              onClick={() => {
                toggleCell(originalRowIndex, originalColIndex);
              }}
              className={twMerge(
                "border border-slate-200",
                grid[originalRowIndex][originalColIndex]
                  ? "bg-slate-500"
                  : "bg-slate-100"
              )}
            />
          ))
        )}
      </div>
      <div className="flex gap-4 py-1">
        <Button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < ROWS; i++) {
              rows.push(
                Array.from(Array(COLS), () => (Math.random() > 0.75 ? 1 : 0))
              );
            }
            setGrid(rows);
            // console.log(rows)
          }}
        >
          Seed
        </Button>
        <Button
          onClick={() => {
            setGrid(createEmptyGrid());
          }}
        >
          Clear
        </Button>
        <PlayPauseButton
          active={active}
          onClick={() => {
            setActive(!active);
            if (!active) {
              activeRef.current = true;
              // console.log("Estacorriendo")
              runGame();
            }
          }}
        />
      </div>
    </>
  );
}

export default Board;
