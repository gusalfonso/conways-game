export const ROWS = 40
export const COLS = 50


export const createEmptyGrid = () => {
    return Array.from({length: ROWS}, () => Array(COLS).fill(0))
}