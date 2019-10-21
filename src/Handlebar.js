// @flow

import React from 'react';

/* @TODO
 * - className
 * - style Obj
 */

const HANDLEBAR_WIDTH = '20px';
const OFFSET = 5;

const TYPES = Object.freeze({
  LEFT: 'left',
  BOTTOM: 'bottom',
});

export type HandlebarEvent = SyntheticMouseEvent<HTMLDivElement>;

type Props = {|
  +onMove: (e: HandlebarEvent) => void,
  +type?: $Values<typeof TYPES>,
|};

const styles = {
  common: {
    position: 'absolute',
  },
  [TYPES.LEFT]: {
    backgroundColor: 'blue',
    opacity: 0.4,
    // @TODO remove dev styless above
    width: HANDLEBAR_WIDTH,
    height: '100%',

    top: 0,
    right: -OFFSET,
    cursor: 'col-resize',
  },
  [TYPES.BOTTOM]: {
    backgroundColor: 'red',
    opacity: 0.4,
    // @TODO remove dev styless above
    width: '100%',
    height: HANDLEBAR_WIDTH,
    bottom: -OFFSET,
    left: 0,
    cursor: 'row-resize',
  },
};

export function Handlebar({ onMove, type = TYPES.LEFT }: Props) {
  return (
    <div
      style={{
        ...styles.common,
        ...styles[type],
      }}
      role="button"
      tabIndex={
        // @TODO??
        -1
      }
      onTouchStart={onMove}
      onMouseDown={onMove}
    ></div>
  );
}
