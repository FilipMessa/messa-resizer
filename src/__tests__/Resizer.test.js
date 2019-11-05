// @flow

import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import puppeteer from 'puppeteer';
import { isDebugging } from '../../testUtils/testConfig';
import { Resizer } from '../Resizer';
import { HADLEBARS_TYPES } from '../common';

// @TODO test TouchEvent https://pptr.dev/#?product=Puppeteer&version=v2.0.0&show=api-pagetouchscreen

const APP = 'http://localhost:6006/';
let page;
let browser;
const WIDTH = 1920;
const HEIGHT = 1080;
const X_AXIS = 400;
const Y_AXIS = 120;

const containerStyles = {
  background: '#C9D6FF',
  boxShadow: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`,
  display: 'flex',
};

const text = 'Live long and prosper';

beforeAll(async () => {
  browser = await puppeteer.launch({
    args: [`--window-size=${WIDTH},${HEIGHT}`],
    ...isDebugging()?.config,
  });
  page = await browser.newPage();

  await page.setViewport({ width: WIDTH, height: HEIGHT });
});
afterAll(() => {
  browser.close();
  cleanup();
});

describe('Resizer', () => {
  async function makeMouseAction(boundingBox) {
    await page.mouse.move(
      boundingBox.x + boundingBox.width / 2,
      boundingBox.y + boundingBox.height / 2
    );

    await page.mouse.down();
    await page.mouse.move(X_AXIS, Y_AXIS);
    await page.mouse.up();
  }

  async function getIframe() {
    await page.goto(APP);
    const iframeElement = await page.waitForSelector('iframe');
    const frame = await iframeElement.contentFrame();
    return frame;
  }
  test('should render properly', () => {
    const { container } = render(<Resizer />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          data-testid="handlebar-container"
          style="position: relative; overflow: hidden; user-select: auto; width: auto; height: auto;"
        >
          <div
            data-testid="handlebar-right"
            style="position: absolute; cursor: col-resize; z-index: 1; height: 100%; width: 20px; right: -5px; top: 0px;"
          />
          <div
            data-testid="handlebar-bottom"
            style="position: absolute; cursor: row-resize; z-index: 1; width: 100%; height: 20px; left: 0px; bottom: -5px;"
          />
          <div
            data-testid="handlebar-bottom-right"
            style="position: absolute; cursor: nwse-resize; z-index: 2; height: 20px; width: 20px; right: -5px; bottom: -5px;"
          />
        </div>
      </div>
    `);
  });

  test('render with children', () => {
    const { getByText } = render(<Resizer>{text}</Resizer>);
    expect(getByText(text)).toBeTruthy();
  });

  test('pass style object into the Resizer container', () => {
    const { getByTestId } = render(
      <Resizer style={containerStyles}>{text}</Resizer>
    );

    const container = getByTestId('handlebar-container');
    expect(container).toHaveStyle(
      'background: rgb(201, 214, 255); box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23); display: flex;'
    );
  });

  test('pass classNames into the Resizer container', () => {
    const classNames = 'class_1 class_2';
    const { getByTestId } = render(
      <Resizer className={classNames}>{text}</Resizer>
    );

    const container = getByTestId('handlebar-container');
    expect(container).toHaveClass(classNames);
  });

  test('pass styles into handlers', () => {
    const handlersStyles = {
      [HADLEBARS_TYPES.BOTTOM]: { backgroundColor: 'red' },
      [HADLEBARS_TYPES.RIGHT]: { backgroundColor: 'green' },
      [HADLEBARS_TYPES.BOTTOM_RIGHT]: { backgroundColor: 'blue' },
    };

    const { getByTestId } = render(
      <Resizer handlersStyles={handlersStyles}>{text}</Resizer>
    );

    expect(getByTestId('handlebar-right')).toHaveStyle(
      'background-color: green;'
    );
    expect(getByTestId('handlebar-bottom')).toHaveStyle(
      'background-color: red;'
    );
    expect(getByTestId('handlebar-bottom-right')).toHaveStyle(
      'background-color: blue;'
    );
  });

  test('pass classNames into handlers', () => {
    const handlersClassNames = {
      bottom: 'bottom-class',
      right: 'right-class',
      'bottom-right': 'bottom-right-class',
    };

    const { getByTestId } = render(
      <Resizer handlersClassNames={handlersClassNames}>{text}</Resizer>
    );

    expect(getByTestId('handlebar-right')).toHaveClass(
      handlersClassNames.right
    );
    expect(getByTestId('handlebar-bottom')).toHaveClass(
      handlersClassNames.bottom
    );
    expect(getByTestId('handlebar-bottom-right')).toHaveClass(
      handlersClassNames['bottom-right']
    );
  });
  test('drag right handlebar', async () => {
    const iframe = await getIframe();
    const resizer = await iframe.waitForSelector(
      '[data-testid="handlebar-container"]'
    );

    const rightHandler = await iframe.waitForSelector(
      '[data-testid="handlebar-right"]'
    );

    const boundingBox = await rightHandler.boundingBox();
    expect(await resizer.boundingBox()).toMatchInlineSnapshot(`
        Object {
          "height": 300,
          "width": 300,
          "x": 233,
          "y": 73,
        }
      `);

    await makeMouseAction(boundingBox);

    expect(await resizer.boundingBox()).toMatchInlineSnapshot(`
        Object {
          "height": 300,
          "width": 172,
          "x": 233,
          "y": 73,
        }
      `);
  });
  test('drag bottom handlebar', async () => {
    const iframe = await getIframe();
    const resizer = await iframe.waitForSelector(
      '[data-testid="handlebar-container"]'
    );

    const bottomHandler = await iframe.waitForSelector(
      '[data-testid="handlebar-bottom"]'
    );

    const boundingBox = await bottomHandler.boundingBox();
    expect(await resizer.boundingBox()).toMatchInlineSnapshot(`
          Object {
            "height": 300,
            "width": 300,
            "x": 233,
            "y": 73,
          }
      `);

    await makeMouseAction(boundingBox);

    expect(await resizer.boundingBox()).toMatchInlineSnapshot(`
      Object {
        "height": 52,
        "width": 300,
        "x": 233,
        "y": 73,
      }
    `);
  });

  test('drag bottom-right handlebar', async () => {
    const iframe = await getIframe();
    const resizer = await iframe.waitForSelector(
      '[data-testid="handlebar-container"]'
    );

    const handler = await iframe.waitForSelector(
      '[data-testid="handlebar-bottom-right"]'
    );

    const boundingBox = await handler.boundingBox();
    expect(await resizer.boundingBox()).toMatchInlineSnapshot(`
      Object {
        "height": 300,
        "width": 300,
        "x": 233,
        "y": 73,
      }
    `);

    await makeMouseAction(boundingBox);

    expect(await resizer.boundingBox()).toMatchInlineSnapshot(`
      Object {
        "height": 52,
        "width": 172,
        "x": 233,
        "y": 73,
      }
    `);
  });
});
