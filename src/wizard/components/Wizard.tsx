import React from 'react';
import { generateWizardNavigation } from '../utils/generate-wizard-navigation';
import { generateWizardSteps } from '../utils/generate-wizard-steps';
import { useActiveStep } from '../hooks/use-active-step';
import { Navigation } from './Navigation';
import { Form } from './Form';

import { wizardSettings } from '../settings/wizard-settings';

import * as classes from './Wizard.module.scss';

const NAV = generateWizardNavigation(wizardSettings.sections);
const STEPS = generateWizardSteps(wizardSettings.sections);

export function Wizard(): JSX.Element {
  const { activeStep, hasNextStep, handelActiveStep } = useActiveStep(
    0,
    STEPS.length,
  );

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.title}>{wizardSettings.name}</h1>
      </header>

      {Navigation(NAV, activeStep, handelActiveStep)}

      {Form(activeStep, hasNextStep, handelActiveStep, STEPS)}
    </div>
  );
}
