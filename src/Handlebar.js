// @flow

import React from 'react';

/* @TODO
 * - className
 * - style Obj
 */

const HANDLEBAR_WIDTH = '20px';
const OFFSET = 5;

const TYPES = Object.freeze({
  RIGHT: 'right',
  BOTTOM: 'bottom',
  BOTTOM_RIGHT: 'bottom-right',
});

export type HandlebarEvent = SyntheticMouseEvent<HTMLDivElement>;
export type HandlebarType = $Values<typeof TYPES>;

type Props = {|
  +onMove: (e: HandlebarEvent, type: HandlebarType) => void,
  +type?: HandlebarType,
|};

const styles = {
  common: {
    position: 'absolute',
  },
  [TYPES.RIGHT]: {
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
  [TYPES.BOTTOM_RIGHT]: {
    backgroundColor: 'green',
    // @TODO remove dev styless above
    width: HANDLEBAR_WIDTH,
    height: HANDLEBAR_WIDTH,
    position: 'absolute',
    right: -OFFSET,
    bottom: -OFFSET,
    cursor: 'nwse-resize',
    zIndex: 100,
  },
};

export function Handlebar({ onMove, type = TYPES.RIGHT }: Props) {
  const handleMove = React.useCallback(
    e => {
      onMove(e, type);
    },
    [onMove, type]
  );

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
      onTouchStart={handleMove}
      onMouseDown={handleMove}
    ></div>
  );
}
