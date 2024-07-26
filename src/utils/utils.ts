export const ROWS = 11;
export const COLS = 18;

export const createEmptyGrid = () => {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
};

export const DIRECTIONS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
