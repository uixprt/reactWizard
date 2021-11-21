import React, {Dispatch, SetStateAction} from 'react';
import { NavigationItem } from '../entities';

import * as classes from './NavigationItems.module.scss';

export const NavigationItems = (
  navData: NavigationItem[],
  activeStep: number,
  setActiveStep: Dispatch<SetStateAction<number>>,
): JSX.Element[] =>
  navData.map((navItem: NavigationItem, index) => (
    <li
      key={index}
      className={`${navItem.isSection ? classes.navSection : classes.navItem}`}
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
        onClick={() => setActiveStep(navItem.stepId)}
      >
        {navItem.title}
      </button>
    </li>
  ));
