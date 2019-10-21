// @flow

import React from 'react';
import { HANDLEBAR_WIDTH, HANDLEBAR_OFFSET, type Style } from './consts';

const TYPES = Object.freeze({
  RIGHT: 'right',
  BOTTOM: 'bottom',
  BOTTOM_RIGHT: 'bottom-right',
});

export type HandlebarEvent = SyntheticMouseEvent<HTMLDivElement>;
export type HandlebarType = $Values<typeof TYPES>;

type Props = {|
  +className?: string,
  +extendStyle?: Style,
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
    right: HANDLEBAR_OFFSET,
    cursor: 'col-resize',
  },
  [TYPES.BOTTOM]: {
    backgroundColor: 'red',
    opacity: 0.4,
    // @TODO remove dev styless above
    width: '100%',
    height: HANDLEBAR_WIDTH,
    bottom: HANDLEBAR_OFFSET,
    left: 0,
    cursor: 'row-resize',
  },
  [TYPES.BOTTOM_RIGHT]: {
    backgroundColor: 'green',
    // @TODO remove dev styless above
    width: HANDLEBAR_WIDTH,
    height: HANDLEBAR_WIDTH,
    position: 'absolute',
    right: HANDLEBAR_OFFSET,
    bottom: HANDLEBAR_OFFSET,
    cursor: 'nwse-resize',
    zIndex: 100,
  },
};

export function Handlebar({
  onMove,
  type = TYPES.RIGHT,
  extendStyle,
  className,
}: Props) {
  const handleMove = React.useCallback(
    e => {
      onMove(e, type);
    },
    [onMove, type]
  );

  return (
    <div
      className={className}
      style={{
        ...styles.common,
        ...styles[type],
        ...extendStyle,
      }}
      onTouchStart={handleMove}
      onMouseDown={handleMove}
    ></div>
  );
}
