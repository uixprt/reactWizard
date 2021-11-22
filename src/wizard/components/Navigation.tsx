import { NavigationItem } from '../entities';

import * as classes from './Navigation.module.scss';

export const Navigation = (
  navData: NavigationItem[],
  activeStep: number,
  handelActiveStep: (stepId?: number) => void,
): JSX.Element => (
  <nav className={classes.nav}>
    <ul className={classes.navList}>
      {navData.map((navItem: NavigationItem) => (
        <li
          key={navItem.id}
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
            onClick={() => handelActiveStep(navItem.stepId)}
          >
            {navItem.title}
          </button>
        </li>
      ))}
    </ul>
  </nav>
);
