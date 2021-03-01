import { useState, createContext, ReactNode } from 'react';

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
}

// create a context to share information about the challenges among components
export const ChallengeContext = createContext({} as ChallengeContextData);

interface ChallengeProviderProps{
  children: ReactNode;
}

// This function will return a Provider of the ChallengeContext
// It will "provide" the level and a function to level up
export function ChallengeContextProvider({ children }: ChallengeProviderProps){
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengeCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  // based on RPG's formula, calculate the experience for the next level
  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  // get a random challenge from the pool
  function startNewChallenge(){
    const randomIndex = Math.floor(Math.random() * challenges.length);
    const newChallenge = challenges[randomIndex];
    // set new active challenge. This info is used in the ChallengeBox component to show the info of the challenge
    setActiveChallenge(newChallenge);
  }

  function levelUp(){
    setLevel(level + 1);
  }

  // used when the user fails to complete the challenge
  function resetChallenge(){
    setActiveChallenge(null);
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
      experienceToNextLevel
    }}>
      {children}
    </ChallengeContext.Provider>
  );
}
