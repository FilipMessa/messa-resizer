// @flow

import * as React from 'react';
import { Handlebar, type HandlebarType } from './Handlebar';

import {
  getCursorPosition,
  getConstraints,
  validateWidth,
  validateHeight,
} from './helpers';

import useWindowListeners from './useWindowListeners';
import useSize from './useSize';
import {
  UNIT,
  HADLEBARS_TYPES,
  HANDLEBAR_WIDTH,
  type Style,
  type CursorEvent,
} from './common';

const DEFAULT_POSITION = {
  x: 0,
  y: 0,
};

type Props = {|
  +className?: string,
  +defaultWidth?: number,
  +defaultHeight?: number,
  +children?: React.Node,
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

type Position = {|
  +x: number,
  +y: number,
|};

export function Resizer({
  className,
  handlersClassNames,
  style,
  handlersStyles,
  children,
  defaultWidth,
  defaultHeight,
  minWidth = HANDLEBAR_WIDTH,
  maxWidth = Infinity,
  minHeight = HANDLEBAR_WIDTH,
  maxHeight = Infinity,
}: Props) {
  const [size, setSize] = useSize({
    height: validateHeight(defaultHeight, maxHeight),
    width: validateWidth(defaultWidth, maxWidth),
  });

  const [isCursorDown, setCursorDown] = React.useState<boolean>(false);

  const [
    handlebarType,
    setHandlebarType,
  ] = React.useState<HandlebarType | null>(null);

  const [
    initialCursorPosition,
    setInitialCursorPosition,
  ] = React.useState<Position>(DEFAULT_POSITION);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const handleCursorMove = position => {
    const getCursorCoordinates = axis => ({
      [axis]: {
        initial: initialCursorPosition[axis],
        current: position[axis],
      },
    });

    switch (handlebarType) {
      case HADLEBARS_TYPES.RIGHT: {
        const { x } = getCursorCoordinates('x');

        // @TODO DRY
        const width = size.width + x.current - x.initial;

        setSize({ width: getConstraints(width, minWidth, maxWidth) });
        break;
      }
      case HADLEBARS_TYPES.BOTTOM: {
        const { y } = getCursorCoordinates('y');

        // @TODO DRY
        const height = size.height + y.current - y.initial;
        setSize({ height: getConstraints(height, minHeight, maxHeight) });

        break;
      }
      case HADLEBARS_TYPES.BOTTOM_RIGHT: {
        const { x } = getCursorCoordinates('x');
        const { y } = getCursorCoordinates('y');

        // @TODO DRY
        const width = size.width + x.current - x.initial;
        const height = size.height + y.current - y.initial;

        setSize({
          height: getConstraints(height, minHeight, maxHeight),
          width: getConstraints(width, minWidth, maxWidth),
        });

        break;
      }
      default:
        return undefined;
    }
  };

  const handleCursorUp = React.useCallback(() => {
    setCursorDown(false);
    setInitialCursorPosition(DEFAULT_POSITION);
    setHandlebarType(null);
  }, []);

  const handleCursorDown = (e: CursorEvent, type: HandlebarType) => {
    setCursorDown(true);
    setInitialCursorPosition({
      x: getCursorPosition('x', e),
      y: getCursorPosition('y', e),
    });
    setHandlebarType(type);
  };

  useWindowListeners({
    isListen: isCursorDown,
    onCursorMove: handleCursorMove,
  });

  React.useEffect(() => {
    /*
     * FLow does not yet support method or property calls in optional chains.
     * $FlowIssue: https://github.com/facebook/flow/issues/4303
     */
    const { width, height } = containerRef.current?.getBoundingClientRect();

    setSize({ width, height });
  }, [containerRef, setSize]);

  const styles = {
    container: {
      position: 'relative',
      overflow: 'hidden',
      touchAction: 'none',
      userSelect: isCursorDown ? 'none' : 'auto',

      width: size.width ? `${size.width}${UNIT}` : 'auto',
      height: size.height ? `${size.height}${UNIT}` : 'auto',
    },
  };

  // $FlowIssue: https://github.com/facebook/flow/issues/2221
  const handlebars: HandlebarType[] = Object.values<HandlebarType>(
    HADLEBARS_TYPES
  );

  return (
    <div
      data-testid="handlebar-container"
      ref={containerRef}
      style={{ ...style, ...styles.container }}
      className={className}
    >
      {handlebars.map(type => (
        <Handlebar
          key={type}
          type={type}
          onPressDown={handleCursorDown}
          onPressUp={handleCursorUp}
          className={handlersClassNames && handlersClassNames[type]}
          extendStyle={handlersStyles && handlersStyles[type]}
        />
      ))}
      {children}
    </div>
  );
}
