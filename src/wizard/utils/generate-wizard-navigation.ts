import { NavigationItem, WizardSection } from '../entities';

export function generateWizardNavigation(
  wizardSections: WizardSection[],
): NavigationItem[] {
  let steps = 1;

  return wizardSections.reduce((nav: NavigationItem[], section) => {
    nav.push({
      title: section.name,
      stepId: steps,
      isSection: true,
    });

    return section.steps.reduce((nav, step) => {
      nav.push({
        title: step.name,
        stepId: steps,
        isSection: false,
      });

      steps++;

      return nav;
    }, nav);
  }, [] as NavigationItem[]);
}
