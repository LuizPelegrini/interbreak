import styles from '../styles/components/CompletedChallenges.module.css';

export default function CompletedChallenges(){
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Challenges Completed</span>
      <span>5</span>
    </div>
  );
}
