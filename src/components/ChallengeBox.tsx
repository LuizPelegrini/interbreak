import styles from '../styles/components/ChallengeBox.module.css';

export default function ChallengeBox(){
  const hasActiveChallenge = true;

  return(
    <div className={styles.challengeBoxContainer}>
      { hasActiveChallenge ? (
          <div className={styles.challengeActive}>
            <header>Earn 400xp</header>

            <main>
              <img src="icons/body.svg" alt=""/>
              <strong>New Challenge</strong>
              <p>Get up and walk for 2 minutes</p>
            </main>

            <footer>
              <button
                className={styles.challengeFailedButton}
                type="button">
                Failed
              </button>
              <button
                className={styles.challengeSucceededButton}
                type="button">
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
