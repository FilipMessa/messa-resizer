import React from 'react';
import { Handlebar } from './Handlebar';

const DEFAULT_SIZE = {
  WIDTH: '100px',
  HEIGHT: '100px',
};

export function Resizer() {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  const styles = {
    root: {
      backgroundColor: 'pink',
      width: DEFAULT_SIZE.WIDTH,
      height: DEFAULT_SIZE.HEIGHT,
    },
  };

  return (
    <div style={styles.root}>
      <Handlebar />
      <button type="button" onClick={handleClick}>
        Click :{count}
      </button>
      [WIP] Resizer
    </div>
  );
}
