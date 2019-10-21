// @flow

import * as React from 'react';
import {
  Handlebar,
  type HandlebarEvent,
  type HandlebarType,
} from './Handlebar';

import {
  EVENTS,
  UNIT,
  HADLEBARS_TYPES,
  HANDLEBAR_WIDTH,
  type Style,
} from './consts';

type Props = {|
  +className?: string,
  +defaultWidth?: number,
  +defaultHeight?: number,
  +children: React.Node,
  +maxHeight?: number,
  +minHeight?: number,
  +minWidth?: number,
  +maxWidth?: number,
  +style?: Style,
  +handlersClassNames?: {|
    +bottom?: string,
    +right?: string,
    +'bottom-right'?: string,
  |},
  +handlersStyles?: {|
    +bottom?: Style,
    +right?: Style,
    +'bottom-right'?: Style,
  |},
|};

const DEFAULT_POSITION = { x: 0, y: 0 };

function validateConstraints(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

function getCurrentCursorPosition(axis, event) {
  if (event.type === EVENTS.TOUCH_MOVE) {
    return event.changedTouches[0][`page${axis.toUpperCase()}`];
  }

  return event[`page${axis.toUpperCase()}`];
}

export function Resizer({
  className,
  style,
  handlersClassNames,
  handlersStyles,
  children,
  defaultWidth,
  defaultHeight,
  minWidth = HANDLEBAR_WIDTH,
  maxWidth = Infinity,
  minHeight = HANDLEBAR_WIDTH,
  maxHeight = Infinity,
}: Props) {
  const [containerWidth, setContainerWidth] = React.useState<?number>(
    defaultWidth
  );
  const [containerHeight, setContainerHeight] = React.useState<?number>(
    defaultHeight
  );

  const [handlebar, setHandlebar] = React.useState<HandlebarType | null>(null);
  const [isCursorDown, setCursorDown] = React.useState<boolean>(false);

  const [initialCursorPosition, setInitialCursorPosition] = React.useState<{|
    +x: number,
    +y: number,
  |}>(DEFAULT_POSITION);

  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    /*
     * FLow does not yet support method or property calls in optional chains.
     * $FlowIssue: https://github.com/facebook/flow/issues/4303
     */
    const { width, height } = containerRef.current?.getBoundingClientRect();

    setContainerWidth(width);
    setContainerHeight(height);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef]);

  const handleCursorMove = e => {
    const getCursorCoordinates = axis => ({
      [axis]: {
        initial: initialCursorPosition && initialCursorPosition[axis],
        current: getCurrentCursorPosition(axis, e),
      },
    });

    switch (handlebar) {
      case HADLEBARS_TYPES.RIGHT: {
        const { x } = getCursorCoordinates('x');

        // @TODO DRY
        const width = containerWidth + x.current - x.initial;

        setContainerWidth(validateConstraints(width, minWidth, maxWidth));
        break;
      }
      case HADLEBARS_TYPES.BOTTOM: {
        const { y } = getCursorCoordinates('y');

        // @TODO DRY
        const height = containerHeight + y.current - y.initial;
        setContainerHeight(validateConstraints(height, minHeight, maxHeight));
        break;
      }
      case HADLEBARS_TYPES.BOTTOM_RIGHT: {
        const { x } = getCursorCoordinates('x');
        const { y } = getCursorCoordinates('y');

        // @TODO DRY
        const width = containerWidth + x.current - x.initial;
        const height = containerHeight + y.current - y.initial;

        setContainerWidth(validateConstraints(width, minWidth, maxWidth));
        setContainerHeight(validateConstraints(height, minHeight, maxHeight));
        break;
      }
      default:
        return undefined;
    }
  };

  const handleCursorUp = React.useCallback(() => {
    setCursorDown(false);
    setInitialCursorPosition(DEFAULT_POSITION);
    setHandlebar(null);
  }, []);

  const handleCursorDown = (
    { clientX, clientY }: HandlebarEvent,
    type: HandlebarType
  ) => {
    setCursorDown(true);
    setInitialCursorPosition({ x: clientX, y: clientY });
    setHandlebar(type);
  };

  React.useEffect(() => {
    if (isCursorDown) {
      // listen for move
      window.addEventListener(EVENTS.MOUSE_MOVE, handleCursorMove);
      window.addEventListener(EVENTS.TOUCH_MOVE, handleCursorMove);

      // listen for cursor up
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

  const styles = {
    container: {
      position: 'relative',
      overflow: 'hidden',
      touchAction: 'none',
      userSelect: isCursorDown ? 'none' : 'auto',

      width: containerWidth ? `${containerWidth}${UNIT}` : 'auto',
      height: containerHeight ? `${containerHeight}${UNIT}` : 'auto',
    },
  };

  // $FlowIssue: https://github.com/facebook/flow/issues/2221
  const handlebars: HandlebarType[] = Object.values<HandlebarType>(
    HADLEBARS_TYPES
  );

  return (
    <div
      ref={containerRef}
      style={{ ...style, ...styles.container }}
      className={className}
    >
      {handlebars.map(type => (
        <Handlebar
          key={type}
          type={type}
          onMove={handleCursorDown}
          className={handlersClassNames && handlersClassNames[type]}
          extendStyle={handlersStyles && handlersStyles[type]}
        />
      ))}
      {children}
    </div>
  );
}
