/**
 * This component is used for all the pages
 */

import '../styles/global.css';

import { ChallengeContextProvider } from '../contexts/ChallengeContext';
import { CountdownContextProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengeContextProvider>
      <Component {...pageProps} />
    </ChallengeContextProvider>
  );
}

export default MyApp
