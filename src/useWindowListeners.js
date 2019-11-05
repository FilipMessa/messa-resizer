// @flow

// @TODO add test

import * as React from 'react';
import { EVENTS, type CursorEvent } from './common';
import { getCursorPosition } from './helpers';

function useWindowListeners({
  isListen,
  onCursorMove,
}: {|
  +isListen: boolean,
  +onCursorMove: ({| +x: number, +y: number |}) => void,
|}) {
  const hanleCursorMove = (e: CursorEvent) => {
    const xAxisPosition = getCursorPosition('x', e);
    const yAxisPosition = getCursorPosition('y', e);
    onCursorMove({ x: xAxisPosition, y: yAxisPosition });
  };

  React.useEffect(() => {
    if (isListen) {
      // listen for move
      window.addEventListener(EVENTS.MOUSE_MOVE, hanleCursorMove);
      window.addEventListener(EVENTS.TOUCH_MOVE, hanleCursorMove);
    }

    return () => {
      window.removeEventListener(EVENTS.MOUSE_MOVE, hanleCursorMove);
      window.removeEventListener(EVENTS.TOUCH_MOVE, hanleCursorMove);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListen]);
}

export default useWindowListeners;
