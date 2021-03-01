import { useState, createContext, ReactNode } from 'react';

// the sole purpose of this interface is to type to the data inside this context,
// so I can use it with IntelliSense and Typescript when
// calling useContext on the components I want to use this context
interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
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

  function startNewChallenge(){
    console.log('start new challenge');
  }

  function levelUp(){
    setLevel(level + 1);
  }

  // Provider of this context
  return (
    <ChallengeContext.Provider value={{
      level,
      currentExperience,
      challengesCompleted,
      levelUp,
      startNewChallenge
    }}>
      {children}
    </ChallengeContext.Provider>
  );
}
