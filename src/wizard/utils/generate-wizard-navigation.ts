import { NavigationItem, WizardSection } from '../entities';

export function generateWizardNavigation(
  wizardSections: WizardSection[],
): NavigationItem[] {
  let sectionIndex = 0;
  let stepIndex = 0;

  return wizardSections.reduce((nav: NavigationItem[], section) => {
    nav.push({
      id: sectionIndex++ + stepIndex,
      title: section.name,
      stepId: stepIndex,
      isSection: true,
    });

    return section.steps.reduce((nav, step) => {
      nav.push({
        id: sectionIndex + stepIndex,
        title: step.name,
        stepId: stepIndex++,
        isSection: false,
      });

      return nav;
    }, nav);
  }, [] as NavigationItem[]);
}
