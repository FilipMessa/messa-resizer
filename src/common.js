// @flow

export const HANDLEBAR_WIDTH = 20;
export const HANDLEBAR_OFFSET = -5;

export const HADLEBARS_TYPES = Object.freeze({
  RIGHT: 'right',
  BOTTOM: 'bottom',
  BOTTOM_RIGHT: 'bottom-right',
});

type EventsType = {|
  +TOUCH_START: 'touchstart',
  +TOUCH_MOVE: 'touchmove',
  +TOUCH_END: 'touchend',
  +MOUSE_MOVE: 'mousemove',
  +MOUSE_UP: 'mouseup',
|};

export const EVENTS: EventsType = Object.freeze({
  TOUCH_START: 'touchstart',
  TOUCH_MOVE: 'touchmove',
  TOUCH_END: 'touchend',
  MOUSE_MOVE: 'mousemove',
  MOUSE_UP: 'mouseup',
});

export const UNIT = 'px';

export type Style = {
  +[key: string]: string | number,
  ...,
};

export type CursorEvent =
  | SyntheticTouchEvent<HTMLDivElement>
  | SyntheticMouseEvent<HTMLDivElement>;
