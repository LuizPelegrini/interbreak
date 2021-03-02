import { useContext } from 'react';

import styles from '../styles/components/Countdown.module.css';
import { CountdownContext } from '../contexts/CountdownContext';

export default function Countdown(){
  // import the functions and data from the countdown context
  const {
    minutes,
    seconds,
    hasFinished,
    isActive,
    startCountdown,
    resetCountdown
  } = useContext(CountdownContext);

  // example: minutes = 6
  // 6 -> '6' -> '06' -> ['0', '6']
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');


  return (
    <div>
      <div className={styles.countdowContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ?
        (
          <button
            disabled
            className={styles.countdownButton}>
            Cycle finished!
          </button>
        ) : (
          !isActive ? (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}>
              Start new cycle
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}>
              Cancel cycle
            </button>
          )
        )
      }



    </div>
  );
}
