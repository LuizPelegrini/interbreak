import { useEffect, useState } from 'react';
import styles from '../styles/components/Countdown.module.css';

export default function Countdown(){
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false); // whether the countdown is paused or resumed

  const minutes = Math.floor( time / 60);
  const seconds = time % 60;

  // example: minutes = 6
  // 6 -> '6' -> '06' -> ['0', '6']
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  useEffect(() => {
    if(active && time > 0){
      setTimeout(() => {
        setTime(time - 1); // this will make this component re-render itself, changin its values
      }, 1000);
    }
  }, [active, time]); // make sure the time is set as dependency so the useEffect is called whenever time changes

  function handleStartCountdown(){
    setActive(true);
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
      <button
        type="button"
        className={styles.countdownButton}
        onClick={handleStartCountdown}
      >
        Start new cycle
      </button>
    </div>
  );
}
