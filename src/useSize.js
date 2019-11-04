// @flow

/* eslint-disable flowtype/require-inexact-type */

import * as React from 'react';

type Size = {|
  +width: ?number,
  +height: ?number,
|};

function useSize(initialState: Size) {
  const [state, set] = React.useState<Size>(initialState);

  const setState = React.useCallback(
    (newState: {| +width?: number, +height?: number |}) => {
      set((prevState: Size): Size => ({
        ...prevState,
        ...newState,
      }));
    },
    [set]
  );

  return [state, setState];
}

export default useSize;
