// @flow

import { cleanup, act } from '@testing-library/react';

import useSize from '../useSize';
import testHook from '../../testUtils/testHook';

afterEach(cleanup);

const width = 100;
const height = 150;

test('useSize', () => {
  let size;
  let setSize;

  testHook(() => ([size, setSize] = useSize({ width, height })));

  expect(size).toMatchInlineSnapshot(`
    Object {
      "height": 150,
      "width": 100,
    }
  `);
  act(() => {
    setSize({ width: 50 });
  });

  expect(size).toMatchInlineSnapshot(`
    Object {
      "height": 150,
      "width": 50,
    }
  `);

  act(() => {
    setSize({ height: 50 });
  });
  expect(size).toMatchInlineSnapshot(`
    Object {
      "height": 50,
      "width": 50,
    }
  `);

  act(() => {
    setSize({ height: 20, width: 20 });
  });
  expect(size).toMatchInlineSnapshot(`
    Object {
      "height": 20,
      "width": 20,
    }
  `);
});
