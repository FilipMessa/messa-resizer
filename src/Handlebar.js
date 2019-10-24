// @flow

import React from 'react';
import {
  HANDLEBAR_WIDTH,
  HANDLEBAR_OFFSET,
  HADLEBARS_TYPES,
  type Style,
} from './common';

export type HandlebarEvent =
  | SyntheticTouchEvent<HTMLDivElement>
  | SyntheticMouseEvent<HTMLDivElement>;

export type HandlebarType = $Values<typeof HADLEBARS_TYPES>;

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
  withChildren: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  [HADLEBARS_TYPES.RIGHT]: {
    // cursor: 'col-resize',
    zIndex: 1,

    height: '100%',
    width: HANDLEBAR_WIDTH,

    right: HANDLEBAR_OFFSET,
    top: 0,
  },
  [HADLEBARS_TYPES.BOTTOM]: {
    // cursor: 'row-resize',
    zIndex: 1,

    width: '100%',
    height: HANDLEBAR_WIDTH,

    left: 0,
    bottom: HANDLEBAR_OFFSET,
  },
  [HADLEBARS_TYPES.BOTTOM_RIGHT]: {
    // cursor: 'nwse-resize',
    zIndex: 2,

    height: HANDLEBAR_WIDTH,
    width: HANDLEBAR_WIDTH,

    right: HANDLEBAR_OFFSET,
    bottom: HANDLEBAR_OFFSET,
  },
};

const getCursorStyle = type => {
  let cursor;
  switch (type) {
    case HADLEBARS_TYPES.BOTTOM_RIGHT: {
      cursor = 'nwse-resize';
      break;
    }
    case HADLEBARS_TYPES.RIGHT: {
      cursor = 'col-resize';
      break;
    }
    case HADLEBARS_TYPES.BOTTOM: {
      cursor = 'row-resize';
      break;
    }
    default:
      cursor = 'auto';
  }
  return {
    cursor,
  };
};

export function Handlebar({
  type = HADLEBARS_TYPES.RIGHT,
  extendStyle,
  className,
  onMove,
  children,
}: Props) {
  const handleMove = React.useCallback(
    e => {
      onMove(e, type);
    },
    [onMove, type]
  );

  const cursorStyle = getCursorStyle(type);

  return (
    <div
      data-testid={`handlebar-${type}`}
      style={{
        ...styles.common,
        ...styles[type],
        ...extendStyle,
        ...(children && styles.withChildren),
        ...(children == null && cursorStyle),
      }}
      className={className}
      {...(!children && {
        onTouchStart: handleMove,
        onMouseDown: handleMove,
      })}
    >
      {children && (
        <div
          onTouchStart={handleMove}
          onMouseDown={handleMove}
          style={cursorStyle}
        >
          {children}
        </div>
      )}
    </div>
  );
}
