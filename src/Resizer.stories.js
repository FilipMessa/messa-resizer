// @flow

import React from 'react';
import { text, object, number } from '@storybook/addon-knobs';
import { Resizer } from './index';

export default {
  title: 'Resizer',
};

const defaultStyles = {
  background: 'linear-gradient(to right,  #C9D6FF, #E2E2E2)',
  boxShadow: `0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)`,
  display: 'flex',
  fontSize: '1.5em',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '15px',
};

const Wrapper = (props: any) => (
  <div
    {...props}
    style={{
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Tahoma, Geneva, sans-serif',
      color: '#043571',
    }}
  />
);

export const example = () => (
  <Wrapper>
    <Resizer
      defaultWidth={300}
      defaultHeight={300}
      style={defaultStyles}
    ></Resizer>
    <Resizer defaultWidth={200} defaultHeight={200} style={defaultStyles} />
  </Wrapper>
);

export const playground = () => {
  const style = object('style', defaultStyles);
  const children = text('children', 'Resizer Playground');
  const maxWidth = number('maxWidth', 1000);
  const defaultWidth = number('defaultWidth', 600);
  const maxHeight = number('maxHeight');
  const defaultHeight = number('defaultHeight', 140);

  return (
    <Wrapper>
      <Resizer
        maxWidth={maxWidth}
        style={style}
        defaultWidth={defaultWidth}
        maxHeight={maxHeight}
        defaultHeight={defaultHeight}
      >
        {children}
      </Resizer>
    </Wrapper>
  );
};
