import clsx from 'clsx';
import { Player, GameStatus } from '@/types';
import styles from './ScoreBoard.module.css';

type ScoreBoardProps = {
  scoreX: number;
  scoreO: number;
  scoreDraw: number;
  currentPlayer: Player;
  status: GameStatus;
};

export default function ScoreBoard({ scoreX, scoreO, scoreDraw, currentPlayer, status }: ScoreBoardProps) {
  return (
    <div className={styles.scoreboard}>
      <div className={clsx(styles.scoreCard, styles.scoreX, {
        [styles.active]: currentPlayer === 'X' && status === 'playing',
      })}>
        <span className={styles.playerLabel}>Player X</span>
        <span className={styles.scoreValue}>{scoreX}</span>
      </div>

      <div className={clsx(styles.scoreCard, styles.scoreDraw)}>
        <span className={styles.playerLabel}>Draws</span>
        <span className={styles.scoreValue}>{scoreDraw}</span>
      </div>

      <div className={clsx(styles.scoreCard, styles.scoreO, {
        [styles.active]: currentPlayer === 'O' && status === 'playing',
      })}>
        <span className={styles.playerLabel}>Player O</span>
        <span className={styles.scoreValue}>{scoreO}</span>
      </div>
    </div>
  );
}
