import React from 'react';

export function Resizer() {
  const [count, setCount] = React.useState(0);
  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Click :{count}
      </button>
      [WIP] Resizer
    </div>
  );
}
