// @flow

import React from 'react';

export type HandlebarEvent = SyntheticMouseEvent<HTMLDivElement>;

const WIDTH = '20px';
const OFFSET = 5;

type Props = {|
  +onMove: (e: HandlebarEvent) => void,
|};

const styles = {
  root: {
    backgroundColor: 'blue',
    opacity: 0.4,
    // @TODO remove dev styless above
    position: 'absolute',

    width: WIDTH,
    height: '100%',

    top: 0,
    right: -OFFSET,

    cursor: 'col-resize', // @TODO switch between cursor base on type (left, top, right, bottom)
  },
};

export function Handlebar({ onMove }: Props) {
  return (
    <div
      style={styles.root}
      role="button"
      tabIndex={-1}
      onTouchStart={onMove}
      onMouseDown={onMove}
    ></div>
  );
}
