// @flow

import React from 'react';
import { Resizer } from './index';

export default {
  title: 'Resizer',
};

export const basic = () => (
  <div style={{ display: 'flex', flexDirection: 'row' }}>
    <Resizer>Work in progress</Resizer>
    <Resizer>Work in progress</Resizer>
  </div>
);
