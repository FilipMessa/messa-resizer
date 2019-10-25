# Resizer Component (Experimental) [WIP]

storybook: https://resizer.messafilip.now.sh

![storybook gif](./example.gif)

## Main Scripts

add to your a project

```sh
yarn add messa-resizer

```

install dependencies

```sh
yarn install
```

run storybook:

```sh
yarn storybook
```

run all test: (flow & eslint & jest)

```sh
yarn test
```

build library:

```sh
yarn build
```

## Examples

Here is a minimal example. (without styles)

```jsx
import React from "react";
import { Resizer } from "messa-resizer";

const App = () => {
  return <Resizer>Resizer component</Resizer>;
};
```

## Component props

| Name               | Type                 | Default  | Description                       |
| :----------------- | :------------------- | :------- | --------------------------------- |
| children           | `React.Node`         |          | The content of the Resizer.       |
| style              | `StyleObject`        |          | The root container's styles.      |
| className          | `string`             |          | The root container's classNames.  |
| defaultWidth       | `number`             |          | The defaultWidth of the Resizer.  |
| defaultHeight      | `number`             |          | The defaultHeight of the Resizer. |
| maxHeight          | `number`             | Infinity | The maxHeight of the Resizer.     |
| minHeight          | `number`             | 20       | The minHeight of the Resizer.     |
| maxWidth           | `number`             | Infinity | The maxWidth of the Resizer.      |
| minWidth           | `number`             | 20       | The minWidth of the Resizer.      |
| handlersStyles     | `HandlersStyles`     |          | The handlebars' inline-styles.    |
| handlersClassNames | `HandlersClassNames` |          | The handlebars' inline-styles.    |

<br/>

```
type HandlersStyles = {|
  +bottom?: StyleObject,
  +right?: StyleObject,
  +"bottom-right"?: StyleObject
|};
```

```
type HandlersClassNames = {|
  +bottom?: string,
  +right?: string,
  +"bottom-right"?: string,
|};
```

## TODOs

- the defaultHeight and defaultWidth should handle string ('auto', '12px', '100%', etc...)
- add E2E tests (cypress or Puppeteer)
- The Handlebar component should be able to have children
- improve unit tests
- improve styles extend API
- continuous integration
- Add handlebars for left and top

## Requirments

- [x] Use ES6 (with Flow) or TypeScript
- [x] Third-party apps should be able to modify styles
- [x] The example should work in Chrome, Firefox and Safari
- [x] Use React
- [x] Add unit tests (each component should be covered)
