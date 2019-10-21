// @flow

/*
 * @TODOs
 *
 * - the defaultHeight and defaultWidth should handle string ('auto', '12px', '100%', etc...)
 * - minWidth and maxWidth
 * - handle height change
 * - handle bottom-left
 * - styles
 *
 *  @IDEAs
 *
 * - maxHeight and maxWidth from props (option)
 * - re-write it into hook insted of component
 */

import React from 'react';
import { Handlebar, type HandlebarEvent } from './Handlebar';

const DEFAULT_PROPS = {
  WIDTH: 'auto',
  HEIGHT: 100,
  MIN_WIDTH: 20, // @TODO - should be same const like in the Handlebar width
  MAX_WIDTH: window.innerWidth, // @TODO??
};

const EVENTS = {
  TOUCH_MOVE: 'touchmove',
  TOUCH_END: 'touchend',
  MOUSE_MOVE: 'mousemove',
  MOUSE_UP: 'mouseup',
};

const UNIT = 'px';

type Props = {|
  +className?: string,
  +defaultWidth?: number | 'auto',
  +defaultHeight?: string,
|};

type CursorEvent = any; // @TODO //MouseEvent | TouchEvent; or SyntheticMouseEvent<> | SyntheticTouchEvent<>;

function getCursorPosition(axis: 'x' | 'y', event: CursorEvent): ?number {
  switch (event.type) {
    case EVENTS.TOUCH_MOVE:
      return event.changedTouches[0][`page${axis.toUpperCase()}`];
    case EVENTS.MOUSE_MOVE:
      return event[`page${axis.toUpperCase()}`];
    default:
      return undefined;
  }
}

export function Resizer({
  className,
  defaultWidth = DEFAULT_PROPS.WIDTH,
  defaultHeight = DEFAULT_PROPS.HEIGHT,
  minWidth = DEFAULT_PROPS.MIN_WIDTH,
  maxWidth = DEFAULT_PROPS.MAX_WIDTH,
}: Props) {
  const [containerWidth, setContainerWidth] = React.useState(defaultWidth);
  const [containerHeight, setContainerHeight] = React.useState(defaultHeight);
  const [isCursorDown, setCursorDown] = React.useState(false);

  const [initialCursorPosition, setInitialCursorPosition] = React.useState<?{|
    +x: number,
    +y: number,
  |}>(null);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // aka componentDidMount: if the defaultWidth is set to 'auto', measure real width
    if (containerRef && containerWidth === 'auto') {
      /*
       * FLow does not yet support method or property calls in optional chains.
       * $FlowIssue: https://github.com/facebook/flow/issues/4303
       */
      const { width, height } = containerRef.current?.getBoundingClientRect();
      setContainerWidth(width);
      setContainerHeight(height);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCursorMove = e => {
    const initalX = initialCursorPosition?.x;
    const xPosition = getCursorPosition('x', e);
    // @TODO refactor - find a cleaner way
    if (initalX && xPosition && typeof containerWidth === 'number') {
      let newWidth = containerWidth + xPosition - initalX;

      if (newWidth < minWidth) {
        newWidth = minWidth;
      }
      if (newWidth > maxWidth) {
        newWidth = maxWidth;
      }

      setContainerWidth(newWidth);
    }
  };

  const handleCursorUp = React.useCallback(() => {
    setCursorDown(false);
    setInitialCursorPosition(null);
  }, []);

  React.useEffect(() => {
    if (isCursorDown) {
      // move
      window.addEventListener(EVENTS.MOUSE_MOVE, handleCursorMove);
      window.addEventListener(EVENTS.TOUCH_MOVE, handleCursorMove);

      // up
      window.addEventListener(EVENTS.MOUSE_UP, handleCursorUp);
      window.addEventListener(EVENTS.TOUCH_END, handleCursorUp);
    }

    return () => {
      window.removeEventListener(EVENTS.MOUSE_MOVE, handleCursorMove);
      window.removeEventListener(EVENTS.TOUCH_MOVE, handleCursorMove);
      window.removeEventListener(EVENTS.MOUSE_UP, handleCursorUp);
      window.removeEventListener(EVENTS.TOUCH_END, handleCursorUp);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCursorDown]);

  const handleOnHandlebarClick = ({ clientX, clientY }: HandlebarEvent) => {
    setCursorDown(true);
    setInitialCursorPosition({ x: clientX, y: clientY });
  };

  const styles = {
    container: {
      margin: '2em',
      backgroundColor: 'pink',
      // @TODO remove dev style above
      position: 'relative',
      overflow: 'hidden',
      touchAction: 'none',
      userSelect: isCursorDown ? 'none' : 'auto',

      width: `${containerWidth}${UNIT}`,
      height: `${containerHeight}${UNIT}`,
    },
  };

  return (
    <div ref={containerRef} style={styles.container} className={className}>
      <Handlebar type="left" onMove={handleOnHandlebarClick} />
      <Handlebar type="bottom" onMove={handleOnHandlebarClick} />
      [WIP] Resizer
    </div>
  );
}
