import type { WizardStep } from './wizard-step';

export interface WizardSection {
  name: string;
  steps: WizardStep[];
}
