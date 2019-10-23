// @flow

import { EVENTS } from './common';
import type { HandlebarEvent } from './Handlebar';

export function getConstraints(n: number, min: number, max: number) {
  return Math.max(Math.min(n, max), min);
}

function createDefaultStateValidation(state: string) {
  return function validateState(defaultValue?: number, maxValue: number) {
    if (defaultValue && defaultValue > maxValue) {
      console.warn(
        `The prop ${state} deafult value(${defaultValue}) is greater than maximum value!`
      );
      return maxValue;
    }

    if (defaultValue && defaultValue < 0) {
      console.warn(
        `The prop ${state} deafult value(${defaultValue}) should not be smaller than 0 value!`
      );
      return 0;
    }
    return defaultValue;
  };
}

export const validateWidth = createDefaultStateValidation('width');
export const validateHeight = createDefaultStateValidation('height');

type Axis = 'x' | 'y';

export function getCursorPosition(axis: Axis, event: HandlebarEvent): number {
  const axisType = `page${axis.toUpperCase()}`;
  if (event.type === EVENTS.TOUCH_MOVE || event.type === EVENTS.TOUCH_START) {
    /*
     * FLow's unions refinements are broken
     * $FlowIssue: https://github.com/facebook/flow/issues/8079
     */
    return event.changedTouches[0][axisType];
  }

  const mouseEvent: { +[key: string]: number, ... } = event; //  Flow 🙈
  return mouseEvent[axisType];
}
