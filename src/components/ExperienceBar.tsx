import styles from '../styles/components/ExperienceBar.module.css';

import { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengeContext';

export default function ExperienceBar(){
  // get the experience from the ChallengeContext to setup the experience bar
  const { currentExperience, experienceToNextLevel } = useContext(ChallengeContext);

  const percentToNextLevel = Math.round((currentExperience / experienceToNextLevel) * 100);

  return(
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div className={styles.xpBar} style={{ width: `${percentToNextLevel}%`}} />
        <span className={styles.xpCurrent} style={{left: `${percentToNextLevel}%`}}>{currentExperience}xp</span>
      </div>
      <span>{experienceToNextLevel}xp</span>
    </header>
  );
}
