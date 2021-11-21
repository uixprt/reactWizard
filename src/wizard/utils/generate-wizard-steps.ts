import { WizardStep, WizardSection } from '../entities';

export function generateWizardSteps(wizardSections: WizardSection[]): WizardStep[] {
  return wizardSections.reduce((steps, section) => {
    return section.steps.reduce((steps, step) => {
      steps.push(step);

      return steps;
    }, steps);
  }, [] as WizardStep[]);
}
