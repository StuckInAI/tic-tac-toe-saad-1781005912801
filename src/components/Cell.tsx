import clsx from 'clsx';
import { Cell as CellType } from '@/types';
import styles from './Cell.module.css';

type CellProps = {
  value: CellType;
  index: number;
  isWinning: boolean;
  onClick: (index: number) => void;
};

export default function Cell({ value, index, isWinning, onClick }: CellProps) {
  return (
    <button
      className={clsx(styles.cell, {
        [styles.cellX]: value === 'X',
        [styles.cellO]: value === 'O',
        [styles.cellWinning]: isWinning,
        [styles.cellEmpty]: value === null,
      })}
      onClick={() => onClick(index)}
      aria-label={value ? `Cell ${index + 1}: ${value}` : `Cell ${index + 1}: empty`}
    >
      {value === 'X' && (
        <svg viewBox="0 0 40 40" className={styles.symbol}>
          <line x1="8" y1="8" x2="32" y2="32" strokeLinecap="round" />
          <line x1="32" y1="8" x2="8" y2="32" strokeLinecap="round" />
        </svg>
      )}
      {value === 'O' && (
        <svg viewBox="0 0 40 40" className={styles.symbol}>
          <circle cx="20" cy="20" r="12" fill="none" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}
