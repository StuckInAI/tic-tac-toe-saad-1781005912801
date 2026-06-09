export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[];

export type GameStatus = 'playing' | 'won' | 'draw';

export type GameState = {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winningLine: number[] | null;
  scoreX: number;
  scoreO: number;
  scoreDraw: number;
  round: number;
};
