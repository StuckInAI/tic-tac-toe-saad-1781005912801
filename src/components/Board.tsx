import clsx from 'clsx';
import { Board as BoardType } from '@/types';
import Cell from '@/components/Cell';
import styles from './Board.module.css';

type BoardProps = {
  board: BoardType;
  winningLine: number[] | null;
  status: string;
  onCellClick: (index: number) => void;
};

export default function Board({ board, winningLine, status, onCellClick }: BoardProps) {
  return (
    <div
      className={clsx(styles.grid, {
        [styles.disabled]: status !== 'playing',
      })}
    >
      {board.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          index={index}
          isWinning={winningLine ? winningLine.includes(index) : false}
          onClick={onCellClick}
        />
      ))}
    </div>
  );
}
