import styles from '../styles/components/Profile.module.css';

export default function Profile(){
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/LuizPelegrini.png" alt="Avatar"/>
      <div>
        <strong>Luiz Pelegrini</strong>
        <p>
          <img src="icons/level.svg" alt="Level"/>
          Level 1
        </p>
      </div>
    </div>
  );
}
