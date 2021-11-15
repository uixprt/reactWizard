import {ControlType} from "../enums";

export interface WizardStep {
  name: string;
  question: string;
  type: ControlType;
  values?: string[];
}



