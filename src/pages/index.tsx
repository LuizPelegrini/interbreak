import Head from 'next/head';
import { GetServerSideProps } from 'next';

import ExperienceBar from '../components/ExperienceBar';
import Profile from '../components/Profile';
import CompletedChallenges from '../components/CompletedChallenges';
import Countdown from '../components/Countdown';
import ChallengeBox from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.css';
import { CountdownContextProvider } from '../contexts/CountdownContext';
import { ChallengeContextProvider } from '../contexts/ChallengeContext';

interface HomeProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    // Passing the data from Next to React
    <ChallengeContextProvider
    level={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}>
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
    </ChallengeContextProvider>
  );
}

// THIS ONLY WORKS AT FILES INSIDE PAGES FOLDER!
// instead of making the request in the React (frontend)
// make the request on the NextJS (server) so the page can be indexed by Google
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // get data from cookies
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  // give the data to React, so it can build the page
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  };
};
