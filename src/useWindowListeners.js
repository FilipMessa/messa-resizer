// @flow

import * as React from 'react';
import { EVENTS, type CursorEvent } from './common';

function useWindowListeners({
  isListen,
  onCursorMove,
}: {|
  +isListen: boolean,
  +onCursorMove: CursorEvent => void,
|}) {
  React.useEffect(() => {
    if (isListen) {
      // listen for move
      window.addEventListener(EVENTS.MOUSE_MOVE, onCursorMove);
      window.addEventListener(EVENTS.TOUCH_MOVE, onCursorMove);
    }

    return () => {
      window.removeEventListener(EVENTS.MOUSE_MOVE, onCursorMove);
      window.removeEventListener(EVENTS.TOUCH_MOVE, onCursorMove);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListen]);
}

export default useWindowListeners;
