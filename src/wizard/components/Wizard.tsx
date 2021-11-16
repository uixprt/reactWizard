/* eslint-disable @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useState } from 'react';
import { generateWizardNavigation } from '../utils/generate-wizard-navigation';
import { generateSteps } from '../utils/generate-steps';
import { EnterIcon } from './EnterIcon';
import { wizard } from '../settings/wizardData';
import { ControlType } from '../enums';
import { NavigationItem, WizardStep } from '../entities';

import * as classes from './Wizard.module.scss';

export function Wizard() {
  const [activeStep, setActiveStep] = useState(1);

  const nav = generateWizardNavigation(wizard.sections);
  const steps = generateSteps(wizard.sections);
  const hasNextStep = activeStep >= steps.length ? false : true;

  useEffect(() => {
    function handleKeypressClick(e: KeyboardEvent) {
      if (e.code === 'Enter') {
        setActiveStep(activeStep + 1);
      }
    }

    function eventListenerCleanup() {
      window.removeEventListener('keypress', handleKeypressClick);
    }

    if (activeStep < steps.length) {
      window.addEventListener('keypress', handleKeypressClick);
    } else {
      eventListenerCleanup();
    }

    return eventListenerCleanup;
  }, [activeStep]);

  const Navigation = () =>
    nav.map((navItem: NavigationItem, index) => (
      <li key={index} className={`${
        navItem.isSection
          ? classes.navSection
          : classes.navItem
      }`}>
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

  const StepForm = (currentStep: WizardStep) => {
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

  const StepContainer = (currentStep: WizardStep) => (
    <>
      <h2 className={classes.question}>{currentStep.question}</h2>
      {StepForm(currentStep)}
    </>
  );

  const Footer = () => {
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
    <div className={classes.wizardContainer}>
      <header>
        <h1 className={classes.title1}>{wizard.name}</h1>
        <nav>
          <ul className={classes.navList}>{Navigation()}</ul>
        </nav>
      </header>
      <main className={classes.wizardMain}>
        {StepContainer(steps[activeStep - 1])}
      </main>
      <footer className={classes.wizardFooter}>{Footer()}</footer>
    </div>
  );
}
