// @flow

import React from 'react';
import {
  HANDLEBAR_WIDTH,
  HANDLEBAR_OFFSET,
  HADLEBARS_TYPES,
  type Style,
} from './common';

import { getCursorPosition } from './helpers';

export type HandlebarType = $Values<typeof HADLEBARS_TYPES>;

type Props = {|
  +className?: string,
  +extendStyle?: Style,
  +onPressDown: ({| +type: HandlebarType, x: number, y: number |}) => void,
  +onPressUp: () => void,
  +type?: HandlebarType,
|};

const styles = {
  common: {
    position: 'absolute',
  },
  [HADLEBARS_TYPES.RIGHT]: {
    cursor: 'col-resize',
    zIndex: 1,

    height: '100%',
    width: HANDLEBAR_WIDTH,

    right: HANDLEBAR_OFFSET,
    top: 0,
  },
  [HADLEBARS_TYPES.BOTTOM]: {
    cursor: 'row-resize',
    zIndex: 1,

    width: '100%',
    height: HANDLEBAR_WIDTH,

    left: 0,
    bottom: HANDLEBAR_OFFSET,
  },
  [HADLEBARS_TYPES.BOTTOM_RIGHT]: {
    cursor: 'nwse-resize',
    zIndex: 2,

    height: HANDLEBAR_WIDTH,
    width: HANDLEBAR_WIDTH,

    right: HANDLEBAR_OFFSET,
    bottom: HANDLEBAR_OFFSET,
  },
};

export function Handlebar({
  type = HADLEBARS_TYPES.RIGHT,
  extendStyle,
  className,
  onPressDown,
  onPressUp,
}: Props) {
  const handlePressDown = React.useCallback(
    e => {
      const x = getCursorPosition('x', e);
      const y = getCursorPosition('y', e);
      onPressDown({ x, y, type });
    },
    [onPressDown, type]
  );

  return (
    <div
      data-testid={`handlebar-${type}`}
      style={{
        ...styles.common,
        ...styles[type],
        ...extendStyle,
      }}
      className={className}
      onTouchStart={handlePressDown}
      onMouseDown={handlePressDown}
      onMouseUp={onPressUp}
      onTouchEnd={onPressUp}
    ></div>
  );
}
