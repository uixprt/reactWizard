import { WizardStep } from '../entities';
import { ControlType } from '../enums';
import { EnterIcon } from './EnterIcon';

import * as classes from './Form.module.scss';

export function Form(
  activeStep: number,
  hasNextStep: boolean,
  handelActiveStep: (stepId?: number) => void,
  steps: WizardStep[],
): JSX.Element {
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
          <button className={classes.footerButton}>{'Next >'}</button>
        </>
      );
    } else {
      return (
        <>
          <button
            className={classes.footerButton}
            onClick={() => handelActiveStep(0)}
          >
            {'Cancel'}
          </button>
          <button className={classes.buttonSubmit}>{'Submit'}</button>
        </>
      );
    }
  };

  return (
    <form
      className={classes.form}
      onSubmit={(e) => {
        e.preventDefault();
        handelActiveStep();
      }}
    >
      <main className={classes.main}>{StepContainer(steps[activeStep])}</main>
      <footer className={classes.footer}>{Footer()}</footer>
    </form>
  );
}
