import { useGame } from '@/hooks/useGame';
import Board from '@/components/Board';
import ScoreBoard from '@/components/ScoreBoard';
import StatusBar from '@/components/StatusBar';
import styles from './GamePage.module.css';

export default function GamePage() {
  const { state, makeMove, resetRound, resetAll } = useGame();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.titleX}>X</span>
          <span className={styles.titleSep}> vs </span>
          <span className={styles.titleO}>O</span>
        </h1>
        <p className={styles.subtitle}>Round {state.round}</p>
      </header>

      <ScoreBoard
        scoreX={state.scoreX}
        scoreO={state.scoreO}
        scoreDraw={state.scoreDraw}
        currentPlayer={state.currentPlayer}
        status={state.status}
      />

      <StatusBar
        status={state.status}
        winner={state.winner}
        currentPlayer={state.currentPlayer}
      />

      <Board
        board={state.board}
        winningLine={state.winningLine}
        status={state.status}
        onCellClick={makeMove}
      />

      <div className={styles.actions}>
        {state.status !== 'playing' ? (
          <button className={styles.btnPrimary} onClick={resetRound}>
            Next Round
          </button>
        ) : null}
        <button className={styles.btnSecondary} onClick={resetAll}>
          Reset All
        </button>
      </div>
    </div>
  );
}
