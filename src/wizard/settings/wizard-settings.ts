import { ControlType } from '../enums';

export const wizardSettings = {
  name: 'My wizard',
  sections: [
    {
      name: 'Section 1',
      steps: [
        {
          name: 'step 1',
          question: 'What is your name?',
          type: ControlType.String,
        },
        {
          name: 'step 2',
          question: 'What is your age?',
          type: ControlType.Number,
        },
        {
          name: 'last step',
          question: 'gender?',
          type: ControlType.Multi,
          values: ['MALE', 'FEMALE'],
        },
      ],
    },
    {
      name: 'Section 2',
      steps: [
        {
          name: 'another step',
          question: 'What shirt size do you wear?',
          type: ControlType.Multi,
          values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        },
      ],
    },
  ],
};
