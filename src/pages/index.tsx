import ExperienceBar from '../components/ExperienceBar';
import Head from 'next/head';

import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';
import { CountdownContextProvider } from '../contexts/CountdownContext';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* As the title of the page changes based on the current page, use the head tag here instead of adding in the _document.tsx */}
      <Head>
        <title>Start | inter.break</title>
      </Head>
      <ExperienceBar />

      {/* Only the Countdown and ChallengeBox components need to access the Countdown context. To call the resetCountdown function and to display the time */}
      <CountdownContextProvider>
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownContextProvider>

    </div>
  );
}
