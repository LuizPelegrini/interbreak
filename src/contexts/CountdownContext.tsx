/**
 * Context to access the countdown functionalities, such as Resetting the countdown
 */

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengeContext";

interface CountdownContextData{
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinished: boolean;
  startCountdown: () => void;
  resetCountdown: () => void;
}

interface CountdownProviderProps{
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

// so I can cancel the setTimeout
let countdownTimeout: NodeJS.Timeout;

export function CountdownContextProvider({children}: CountdownProviderProps){
  // needed so we can call startNewChallenge() from the Challenge Context
  const { startNewChallenge } = useContext(ChallengeContext);

  const [time, setTime] = useState(0.05 * 60);
  const [isActive, setIsActive] = useState(false); // whether the countdown is paused or resumed
  const [hasFinished, setHasFinished] = useState(false); // whether the countdown has finished or not

  const minutes = Math.floor( time / 60);
  const seconds = time % 60;

  useEffect(() => {
    if(isActive && time > 0){
      countdownTimeout = setTimeout(() => {
        setTime(time - 1); // this will make this component re-render itself, changin its values
      }, 1000);
    } else if(isActive && time === 0){
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }

  }, [isActive, time]); // make sure the time is set as dependency so the useEffect is called whenever time changes

  function startCountdown(){
    setIsActive(true);
  }

  function resetCountdown(){
    // force setTimeout to not execute the callback function
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(0.05 * 60);
    setHasFinished(false);
  }


  return(
    <CountdownContext.Provider value={{
      minutes,
      seconds,
      isActive,
      hasFinished,
      startCountdown,
      resetCountdown
    }}>
      {children}
    </CountdownContext.Provider>
  );
};
