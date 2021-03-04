import { useState, createContext, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import challenges from '../../challenges.json';

interface Challenge{
  type: 'body' | 'eye';
  description: string;
  amount: number;
}

// the sole purpose of this interface is to type to the data inside this context,
// so I can use it with IntelliSense and Typescript when
// calling useContext on the components I want to use this context
interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
}

// create a context to share information about the challenges among components
export const ChallengeContext = createContext({} as ChallengeContextData);

interface ChallengeProviderProps{
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

// This function will return a Provider of the ChallengeContext
// It will "provide" the level and functions to level up, start challenge, complete challenge...
export function ChallengeContextProvider({
  children,
  level: cookieLevel,
  currentExperience: cookieExp,
  challengesCompleted: cookieChallengesCompleted
}: ChallengeProviderProps){
  // initialize data coming from cookies
  const [level, setLevel] = useState(cookieLevel ?? 1);
  const [currentExperience, setCurrentExperience] = useState(cookieExp ?? 0);
  const [challengesCompleted, setChallengeCompleted] = useState(cookieChallengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  // based on RPG's formula, calculate the experience for the next level
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  // request notification permission
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  // whenever the level, experience or challengesCompleted changes, we must save in the cookies
  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExperience, challengesCompleted]);

  // get a random challenge from the pool
  function startNewChallenge(){
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const newChallenge = challenges[randomIndex];
    // set new active challenge. This info is used in the ChallengeBox component to show the info of the challenge
    setActiveChallenge(newChallenge);

    // play notification sound
    new Audio('/notification.mp3').play();

    // show a notification
    if(Notification.permission === 'granted'){
      new Notification('New Challenge 🎉', {
        body: `Earn ${newChallenge.amount}xp!`
      });
    }
  }

  function levelUp(){
    setLevel(level + 1);
  }

  // used when the user FAILS to complete the challenge
  function resetChallenge(){
    setActiveChallenge(null);
  }

  // used when the user COMPLETES the challenge
  function completeChallenge(){
    // Make sure there is an active state
    if(!activeChallenge) return;

    // Retrieves the amount of experience from the active challenge
    const { amount } = activeChallenge;

    let finalExperience = currentExperience + amount;
    // if the amount of experience the user has earned goes beyond the experience to next level
    // I need to level up and get the remainder of the experience
    if(finalExperience >= experienceToNextLevel){
      finalExperience -= experienceToNextLevel;
      levelUp();
    }


    setCurrentExperience(finalExperience); // updates the current experience
    setActiveChallenge(null); // removes an active challenge
    setChallengeCompleted(challengesCompleted + 1); // adds to the challenge completed state
  }

  // Provider of this context
  return (
    <ChallengeContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      levelUp,
      startNewChallenge,
      activeChallenge,
      resetChallenge,
      experienceToNextLevel,
      completeChallenge,
    }}>
      {children}
    </ChallengeContext.Provider>
  );
}
