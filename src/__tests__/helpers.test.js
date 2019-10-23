// @flow

import {
  getConstraints,
  validateWidth,
  validateHeight,
  getCursorPosition,
} from '../helpers';

global.console = {
  warn: jest.fn(msg => msg),
};

const TouchEvent = {
  type: 'touchstart',
  changedTouches: [{ pageX: 160, pageY: 203 }],
};

const MouseEvent = { pageX: 160, pageY: 203 };

const axis = ['y', 'x'];

describe('getCursorPosition', () => {
  axis.forEach(a => {
    it(`get ${a} postion from the TouchEvent`, () => {
      // $FlowExpectedError: for test purpose I use simplified mocked event
      const result = getCursorPosition(a, TouchEvent);
      expect(result).toEqual(
        TouchEvent.changedTouches[0][`page${a.toUpperCase()}`]
      );
    });
  });

  axis.forEach(a => {
    it(`get ${a} postion from the TouchEvent`, () => {
      // $FlowExpectedError: for test purpose I use simplified mocked event
      const result = getCursorPosition(a, MouseEvent);
      expect(result).toEqual(MouseEvent[`page${a.toUpperCase()}`]);
    });
  });
});

describe('getConstraints', () => {
  const minValue = 50;
  const maxValue = 150;

  it('the value is between constraints, so it should return the value', () => {
    const value = 100;
    const result = getConstraints(value, minValue, maxValue);
    expect(result).toEqual(value);
  });

  it('the value smaller than minValue so it should return minValue', () => {
    const value = 10;
    const result = getConstraints(value, minValue, maxValue);
    expect(result).toEqual(minValue);
  });

  it('the value greater than minValue so it should return maxValue', () => {
    const value = 200;
    const result = getConstraints(value, minValue, maxValue);
    expect(result).toEqual(maxValue);
  });
});

describe('validateWidth', () => {
  it('defaultWidthProp is smaller than maxWidth so it should return defaultWidthProp', () => {
    const maxWidth = 100;
    const defaultWidthProp = 99;
    const result = validateWidth(defaultWidthProp, maxWidth);
    expect(result).toEqual(defaultWidthProp);
  });

  it('defaultWidthProp is greater than maxWidth so it should return maxWidth', () => {
    const maxWidth = 100;
    const defaultWidthProp = 101;
    const result = validateWidth(defaultWidthProp, maxWidth);
    expect(result).toEqual(maxWidth);
    expect(console.warn).toBeCalledWith(
      `The prop width deafult value(${defaultWidthProp}) is greater than maximum value!`
    );
  });

  it('defaultWidthProp is smaller than zero so it should return 0', () => {
    const maxWidth = 100;
    const defaultWidthProp = -1;
    const result = validateWidth(defaultWidthProp, maxWidth);
    expect(result).toEqual(0);
    expect(console.warn).toBeCalledWith(
      `The prop width deafult value(${defaultWidthProp}) should not be smaller than 0 value!`
    );
  });
});

describe('validateHeight', () => {
  it('defaultHeightProp is smaller than maxHeight so it should return defaultHeightProp', () => {
    const maxHeight = 100;
    const defaultHeightProp = 99;
    const result = validateHeight(defaultHeightProp, maxHeight);
    expect(result).toEqual(defaultHeightProp);
  });

  it('defaultHeightProp is greater than maxHeight so it should return maxHeight', () => {
    const maxHeight = 100;
    const defaultHeightProp = 101;
    const result = validateHeight(defaultHeightProp, maxHeight);
    expect(result).toEqual(maxHeight);
    expect(console.warn).toBeCalledWith(
      `The prop height deafult value(${defaultHeightProp}) is greater than maximum value!`
    );
  });

  it('defaultHeightProp is smaller than zero so it should return 0', () => {
    const maxHeight = 100;
    const defaultHeightProp = -1;
    const result = validateHeight(defaultHeightProp, maxHeight);
    expect(result).toEqual(0);
    expect(console.warn).toBeCalledWith(
      `The prop height deafult value(${defaultHeightProp}) should not be smaller than 0 value!`
    );
  });
});
