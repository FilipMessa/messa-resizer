// @flow

import renderer from 'react-test-renderer';
import React from 'react';
import { Resizer } from '../Resizer';

test('render properly', () => {
  const child = <div />;
  const component = renderer.create(<Resizer>{child}</Resizer>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
