import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';
import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox(){

  // get the active challenge information from the context
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext);

  return(
    <div className={styles.challengeBoxContainer}>
      { activeChallenge ? (
          <div className={styles.challengeActive}>
            <header>Earn {activeChallenge.amount}xp</header>

            <main>
              <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
              <strong>New Challenge</strong>
              <p>{activeChallenge.description}</p>
            </main>

            <footer>
              <button
                className={styles.challengeFailedButton}
                type="button"
                onClick={resetChallenge}>
                Failed :(
              </button>
              <button
                className={styles.challengeSucceededButton}
                type="button"
                onClick={completeChallenge}>
                Completed!
              </button>
            </footer>

          </div>
        ) : (
          <div className={styles.challengeNotActive}>
            <strong>Finish a cycle to get a challenge</strong>
            <p>
              <img src="icons/level-up.svg" alt="Level Up"/>
              Level up by completing the challenges
            </p>
          </div>
        )}
    </div>
  );
}
