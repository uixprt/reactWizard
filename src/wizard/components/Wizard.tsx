import React, { useEffect, useState } from "react";
import { generateWizardNavigation } from "../utils/generate-wizard-navigation";
import { generateSteps } from "../utils/generate-steps";
import { EnterIcon } from "./EnterIcon";
import { wizard } from "../settings/wizardData";
import { ControlType } from "../enums";
import { WizardStep } from "../entities";

export function Wizard() {
  const [activeStep, setActiveStep] = useState(1);

  const nav = generateWizardNavigation(wizard.sections);
  const steps = generateSteps(wizard.sections);

  useEffect(() => {
    const handleEnterClick = (e: KeyboardEvent) => {
      console.log({ e });
      if (e.code === "Enter" && activeStep < steps.length) {
        setActiveStep(activeStep + 1);
      }

      if (e.code === "Backspace" && activeStep > 1) {
        setActiveStep(activeStep - 1);
      }
    };

    window.addEventListener("keydown", handleEnterClick);
  }, [activeStep, setActiveStep, steps]);

  const navigation = nav.map((navItem, index) => (
    <li key={index}>
      <button
        className={`
              ${navItem.isSection ? "section-title" : ""}
              ${
                navItem.stepId === activeStep
                  ? "active"
                  : navItem.stepId <= activeStep
                  ? "prev"
                  : ""
              }
          `}
        onClick={() => setActiveStep(navItem.stepId)}
      >
        {navItem.title}
      </button>
    </li>
  ));

  const stepForm = (currentStep: WizardStep) => {
    let formGroup;
    if (currentStep.type === ControlType.Multi && currentStep.values) {
      formGroup = currentStep.values.map((value, index) => (
        <label key={index} htmlFor={value}>
          <input
            id={value}
            type="radio"
            name={currentStep.question.replace("?", "").replace(" ", "-")}
            value={value}
          />
          <span>{value}</span>
        </label>
      ));
    } else {
      formGroup = <input type={currentStep.type} />;
    }

    return <div className="form-group">{formGroup}</div>;
  };

  const stepContainer = (currentStep: WizardStep) => (
    <div className={"step"}>
      <h2 className={"question"}>{currentStep.question}</h2>
      {stepForm(currentStep)}
    </div>
  );

  const hasNextStep = activeStep >= steps.length ? false : true;

  return (
    <div className={"container"}>
      <header>
        <h1>{wizard.name}</h1>
        <nav>
          <ul>{navigation}</ul>
        </nav>
      </header>
      <main>{stepContainer(steps[activeStep - 1])}</main>
      <footer>
        <span className={`${hasNextStep ? "" : "disabled"}`}>
          Press <b>Enter</b> <EnterIcon /> or click
        </span>
        <button
          className={"button-next"}
          onClick={() => setActiveStep(activeStep + 1)}
          disabled={!hasNextStep}
        >
          {"Next >"}
        </button>
      </footer>
    </div>
  );
}
