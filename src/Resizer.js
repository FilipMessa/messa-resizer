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
  WIDTH: 150,
  HEIGHT: 100,
  MIN_WIDTH: 1,
};

const EVENTS = {
  TOUCH_MOVE: 'touchmove',
  TOUCH_END: 'touchend',
  MOUSE_MOVE: 'mousemove',
  MOUSE_UP: 'mouseup',
};

type Props = {|
  +className?: string,
  +defaultWidth?: number,
  +defaultHeight?: string,
|};

type CursorEvent = any; // SyntheticMouseEvent<> | SyntheticTouchEvent<>;

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
}: Props) {
  const [rootWidth, setRootWidth] = React.useState(defaultWidth);
  const [
    rootHeight,
    //  setRootHeight
  ] = React.useState(defaultHeight);
  const [isCursorDown, setCursorDown] = React.useState(false);

  const [initialCursorPosition, setInitialCursorPosition] = React.useState<?{|
    +x: number,
    +y: number,
  |}>(null);

  // const containerRef = React.useRef<HTMLDivElement>(null);

  const handleCursorMove = e => {
    const initalX = initialCursorPosition?.x;
    if (initalX) {
      const xPosition = getCursorPosition('x', e);

      // @TODO refactor (maxWidth)
      const newWidth = rootWidth + xPosition - initalX;

      setRootWidth(minWidth > newWidth ? minWidth : newWidth);
    }
  };

  const handleCursorUp = () => {
    setCursorDown(false);
    setInitialCursorPosition(null);
  };

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
    root: {
      margin: '2em',
      backgroundColor: 'pink',
      // @TODO remove dev style above
      position: 'relative',
      overflow: 'hidden',
      touchAction: 'none',

      width: rootWidth,
      height: rootHeight,
    },
  };

  return (
    <div
      ref={
        // containerRef @TODO??
        null
      }
      style={styles.root}
      className={className}
    >
      <Handlebar onMove={handleOnHandlebarClick} />
      [WIP] Resizer
    </div>
  );
}
