import { useState, useCallback } from 'react';
import { Board, Cell, GameState, Player } from '@/types';

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner(board: Board): { winner: Player | null; line: number[] | null } {
  for (const line of WINNING_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }
  return { winner: null, line: null };
}

function createInitialBoard(): Board {
  return Array(9).fill(null) as Cell[];
}

const initialState: GameState = {
  board: createInitialBoard(),
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  winningLine: null,
  scoreX: 0,
  scoreO: 0,
  scoreDraw: 0,
  round: 1,
};

export function useGame() {
  const [state, setState] = useState<GameState>(initialState);

  const makeMove = useCallback((index: number) => {
    setState(prev => {
      if (prev.status !== 'playing') return prev;
      if (prev.board[index] !== null) return prev;

      const newBoard: Board = [...prev.board];
      newBoard[index] = prev.currentPlayer;

      const { winner, line } = checkWinner(newBoard);

      if (winner) {
        return {
          ...prev,
          board: newBoard,
          status: 'won',
          winner,
          winningLine: line,
          scoreX: winner === 'X' ? prev.scoreX + 1 : prev.scoreX,
          scoreO: winner === 'O' ? prev.scoreO + 1 : prev.scoreO,
        };
      }

      const isDraw = newBoard.every(cell => cell !== null);
      if (isDraw) {
        return {
          ...prev,
          board: newBoard,
          status: 'draw',
          winner: null,
          winningLine: null,
          scoreDraw: prev.scoreDraw + 1,
        };
      }

      return {
        ...prev,
        board: newBoard,
        currentPlayer: prev.currentPlayer === 'X' ? 'O' : 'X',
      };
    });
  }, []);

  const resetRound = useCallback(() => {
    setState(prev => ({
      ...prev,
      board: createInitialBoard(),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      winningLine: null,
      round: prev.round + 1,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState({ ...initialState, round: 1 });
  }, []);

  return { state, makeMove, resetRound, resetAll };
}
