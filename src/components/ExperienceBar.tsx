import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar(){
  return(
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div className={styles.xpBar} style={{ width: '50%'}} />
        <span className={styles.xpCurrent} style={{left: '50%'}}>300px</span>
      </div>
      <span>600 xp</span>
    </header>
  );
}
