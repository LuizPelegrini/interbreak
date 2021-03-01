import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

let countdownTimeout: NodeJS.Timeout;

export default function Countdown(){
  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false); // whether the countdown is paused or resumed
  const [hasFinished, setHasFinished] = useState(false); // whether the countdown has finished or not

  const minutes = Math.floor( time / 60);
  const seconds = time % 60;

  // example: minutes = 6
  // 6 -> '6' -> '06' -> ['0', '6']
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time - 1); // this will make this component re-render itself, changin its values
      }, 1000);
    } else if(isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
    }

  }, [isActive, time]); // make sure the time is set as dependency so the useEffect is called whenever time changes

  function handleStartCountdown(){
    setIsActive(true);
  }

  function handleCancelCountdown(){
    // force setTimeout to not execute the callback function
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(25 * 60);
  }

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
              onClick={handleStartCountdown}>
              Start new cycle
            </button>
          ) : (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={handleCancelCountdown}>
              Cancel cycle
            </button>
          )
        )
      }



    </div>
  );
}
