import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export function useActiveStep(
  initialState: number,
  stepsLength: number,
): {
  activeStep: number;
  hasNextStep: boolean;
  handelActiveStep: (stepId?: number) => void;
} {
  const [activeStep, setActiveStep] = useState(initialState);

  useEffect(() => {
    function handleKeypressClick(e: KeyboardEvent) {
      if (e.code === 'Enter') {
        handelActiveStep();
      }
    }

    function eventListenerCleanup() {
      window.removeEventListener('keypress', handleKeypressClick);
    }

    window.addEventListener('keypress', handleKeypressClick);

    return eventListenerCleanup;
  }, [activeStep]);

  const hasNextStep = activeStep >= stepsLength - 1 ? false : true;

  function handelActiveStep(stepId: number | null = null) {
    if (stepId !== null) {
      setActiveStep(stepId);
    } else if (hasNextStep) {
      setActiveStep(activeStep + 1);
    } else {
      return;
    }
  }

  return { activeStep, hasNextStep, handelActiveStep };
}
