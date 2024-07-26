import React, { useState, useRef, useCallback, useEffect } from "react";
import { createEmptyGrid, COLS, ROWS, DIRECTIONS } from "../utils/utils";
import { PlayPauseButton } from "./PlayPauseButton";
import { Button } from "./Button";
import "../styles/Board.css";

function Board() {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [active, setActive] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const activeRef = useRef(active);
  activeRef.current = active;

  const runGame = useCallback(() => {
    if (!activeRef.current) return;

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
  }, []);

  useEffect(() => {
    if (active) {
      runGame();
    }
  }, [active, runGame]);

  function handleMouseDown() {
    setMouseDown(true);
  }

  function handleMouseUp() {
    setMouseDown(false);
  }

  function handleToggle(row: number, col: number) {
    if (mouseDown) {
      toggleCell(row, col);
    }
  }

  function toggleCell(rowToToggle: number, colToToggle: number) {
    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row, rowIndex) =>
        row.map((cell, colIndex) =>
          rowIndex === rowToToggle && colIndex === colToToggle
            ? cell
              ? 0
              : 1
            : cell
        )
      );
      return newGrid;
    });
  }

  return (
    <div className="board-container">
      <h1>Conway's Life Game</h1>
      <div
        className="board"
        style={
          {
            "--rows": ROWS,
            "--cols": COLS,
          } as React.CSSProperties
        }
      >
        {grid.map((rows, originalRowIndex) =>
          rows.map((originalColIndex) => (
            <button
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseEnter={() =>
                handleToggle(originalRowIndex, originalColIndex)
              }
              key={`${originalRowIndex}-${originalColIndex}`}
              onClick={() => toggleCell(originalRowIndex, originalColIndex)}
              className={`cell ${
                grid[originalRowIndex][originalColIndex] ? "alive" : "dead"
              }`}
            />
          ))
        )}
      </div>
      <div className="controls">
        <Button
          onClick={() => {
            const rows = [];
            for (let i = 0; i < ROWS; i++) {
              rows.push(
                Array.from(Array(COLS), () => (Math.random() > 0.75 ? 1 : 0))
              );
            }
            setGrid(rows);
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
            setActive((prevActive) => !prevActive);
          }}
        />
      </div>
    </div>
  );
}

export default Board;
