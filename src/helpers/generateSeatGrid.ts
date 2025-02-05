export type Seat = {
  id: string;
  status: "available" | "occupied" | "free" | "selected";
};

const getRandomOccupiedSeats = (
  rows: number,
  columns: number,
  count: number
) => {
  const occupiedSeats: { row: number; col: number }[] = [];
  while (occupiedSeats.length < count) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * columns);
    const seatAlreadyOccupied = occupiedSeats.some(
      (seat) => seat.row === row && seat.col === col
    );
    if (!seatAlreadyOccupied) {
      occupiedSeats.push({ row, col });
    }
  }
  return occupiedSeats;
};

export const generateSeatGrid = (rows: number, columns: number): Seat[][] => {
  const grid: Seat[][] = [];

  for (let i = 0; i < rows; i++) {
    const row: Seat[] = [];
    for (let j = 0; j < columns; j++) {
      row.push({
        id: `${i}-${j}`,
        status: "free",
      });
    }
    grid.push(row);
  }

  const occupiedSeats = getRandomOccupiedSeats(rows, columns, 5);
  occupiedSeats.forEach(({ row, col }) => {
    grid[row][col].status = "occupied";
  });

  return grid;
};

export const saveSeatGridToLocalStorage = (id: string, grid: Seat[][]) => {
  localStorage.setItem(`seatGrid-${id}`, JSON.stringify(grid));
};

export const loadSeatGridFromLocalStorage = (id: string): Seat[][] | null => {
  const savedGrid = localStorage.getItem(`seatGrid-${id}`);
  return savedGrid ? JSON.parse(savedGrid) : null;
};
