// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';

import BindKeys from './BindKeys';

const keyHandlers = {
  MOVE_LEFT: () => console.log('left'),
  MOVE_RIGHT: () => console.log('right'),
  MOVE_DOWN: () => console.log('down'),
  MOVE_UP: () => console.log('up'),
  MUTE: () => console.log('mute'),
};
const keyMap = {
  MOVE_LEFT: ['arrowleft', 'shift+tab'],
  MOVE_RIGHT: ['arrowright', 'tab'],
  MOVE_DOWN: ['arrowdown'],
  MOVE_UP: ['arrowup'],
  MUTE: ['meta+e', 'e+meta'],
};

export default {
  title: 'BindKeys',
  component: BindKeys,
  parameters: {
    keyMap,
    keyHandlers,
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <BindKeys keyMap={keyMap} keyHandlers={keyHandlers}>
      {children}
    </BindKeys>
  );
};

const Child = () => (
  <div
    tabIndex={-1}
    style={{
      display: 'flex',
      width: '300px',
      height: '300px',
    }}
  />
);
export const SingleChild = Template.bind({});
SingleChild.args = {
  children: <Child />,
};

export const MultipleChildren = Template.bind({});
MultipleChildren.args = {
  children: [<Child key={0} />, <Child key={1} />],
};
