import { Player, GameStatus } from '@/types';
import styles from './StatusBar.module.css';
import clsx from 'clsx';

type StatusBarProps = {
  status: GameStatus;
  winner: Player | null;
  currentPlayer: Player;
};

export default function StatusBar({ status, winner, currentPlayer }: StatusBarProps) {
  let message = '';
  let type: 'x' | 'o' | 'draw' | 'playing' = 'playing';

  if (status === 'won' && winner) {
    message = `Player ${winner} wins!`;
    type = winner === 'X' ? 'x' : 'o';
  } else if (status === 'draw') {
    message = "It's a draw!";
    type = 'draw';
  } else {
    message = `Player ${currentPlayer}'s turn`;
    type = currentPlayer === 'X' ? 'x' : 'o';
  }

  return (
    <div
      className={clsx(styles.statusBar, {
        [styles.statusX]: type === 'x',
        [styles.statusO]: type === 'o',
        [styles.statusDraw]: type === 'draw',
      })}
    >
      <span className={styles.message}>{message}</span>
    </div>
  );
}
