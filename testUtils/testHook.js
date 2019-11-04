// @flow

import React from 'react';
import { render } from '@testing-library/react';

function TestHook({ callback }: {| +callback: any |}) {
  callback();
  return null;
}

const testHook = (callback: any) => {
  render(<TestHook callback={callback} />);
};

export default testHook;
