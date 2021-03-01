import styles from '../styles/components/CompletedChallenges.module.css';

import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

export default function CompletedChallenges(){
  // get data from context to show the number of challenges completed
  const { challengesCompleted } = useContext(ChallengeContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Challenges Completed</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
