/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { generateWizardNavigation } from '../utils/generate-wizard-navigation';
import { generateWizardSteps } from '../utils/generate-wizard-steps';
import { EnterIcon } from './EnterIcon';
import { wizard } from '../settings/wizardData';
import { ControlType } from '../enums';
import { NavigationItem, WizardStep } from '../entities';
import { useActiveStep } from '../hooks/use-active-step';


import * as classes from './Wizard.module.scss';

export function Wizard(): JSX.Element {
  const nav = generateWizardNavigation(wizard.sections);
  const steps = generateWizardSteps(wizard.sections);
  const { activeStep, hasNextStep, setActiveStep } = useActiveStep(
    1,
    steps.length,
  );

  const Navigation = (): JSX.Element[] =>
    nav.map((navItem: NavigationItem, index) => (
      <li
        key={index}
        className={`${
          navItem.isSection ? classes.navSection : classes.navItem
        }`}
      >
        <button
          className={`
              ${
                navItem.isSection
                  ? classes.navSectionButton
                  : `${classes.navItemButton} ${classes.styledButton}`
              }
              ${
                navItem.stepId === activeStep
                  ? classes.active
                  : navItem.stepId <= activeStep
                  ? classes.prev
                  : ''
              }
          `}
          onClick={() => setActiveStep(navItem.stepId)}
        >
          {navItem.title}
        </button>
      </li>
    ));

  const StepForm = (currentStep: WizardStep): JSX.Element => {
    let formGroup;
    if (currentStep.type === ControlType.Multi && currentStep.values) {
      formGroup = currentStep.values.map((value, index) => (
        <label className={classes.radioLabel} key={index} htmlFor={value}>
          <input
            id={value}
            type="radio"
            name={currentStep.question.replace(/[!@#$?%^&*| ]/g, '')}
            value={value}
          />
          <span>{value}</span>
        </label>
      ));
    } else if (currentStep.type === ControlType.String) {
      formGroup = <input className={classes.controlInput} type="text" />;
    } else {
      formGroup = (
        <input className={classes.controlInput} type={currentStep.type} />
      );
    }

    return <div className={classes.formGroup}>{formGroup}</div>;
  };

  const StepContainer = (currentStep: WizardStep): JSX.Element => (
    <>
      <h2 className={classes.question}>{currentStep.question}</h2>
      {StepForm(currentStep)}
    </>
  );

  const Footer = (): JSX.Element => {
    if (hasNextStep) {
      return (
        <>
          <span>
            Press <b>Enter</b> <EnterIcon /> or click
          </span>
          <button
            className={`${classes.footerButton} ${classes.buttonNext}`}
            onClick={() => setActiveStep(activeStep + 1)}
          >
            {'Next >'}
          </button>
        </>
      );
    } else {
      return (
        <button
          className={classes.buttonSubmit}
          onClick={() => setActiveStep(1)}
        >
          {'Submit'}
        </button>
      );
    }
  };

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <h1 className={classes.title}>{wizard.name}</h1>
      </header>
      <nav className={classes.nav}>
        <ul className={classes.navList}>{Navigation()}</ul>
      </nav>
      <main className={classes.main}>
        {StepContainer(steps[activeStep - 1])}
      </main>
      <footer className={classes.footer}>{Footer()}</footer>
    </div>
  );
}
