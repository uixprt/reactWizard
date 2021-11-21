import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function useActiveStep(
  initialState: number,
  stepsLength: number,
): {
  activeStep: number;
  hasNextStep: boolean;
  setActiveStep: Dispatch<SetStateAction<number>>;
} {
  const [activeStep, setActiveStep] = useState(initialState);

  const hasNextStep = activeStep >= stepsLength ? false : true;

  useEffect(() => {
    function handleKeypressClick(e: KeyboardEvent) {
      if (e.code === 'Enter') {
        setActiveStep(activeStep + 1);
      }
    }

    function eventListenerCleanup() {
      window.removeEventListener('keypress', handleKeypressClick);
    }

    if (activeStep < stepsLength) {
      window.addEventListener('keypress', handleKeypressClick);
    } else {
      eventListenerCleanup();
    }

    return eventListenerCleanup;
  }, [activeStep]);

  return { activeStep, hasNextStep, setActiveStep };
}
