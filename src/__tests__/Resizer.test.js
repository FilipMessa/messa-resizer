// @flow

import renderer from 'react-test-renderer';
import React from 'react';
import { Resizer } from '../Resizer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(<Resizer />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
