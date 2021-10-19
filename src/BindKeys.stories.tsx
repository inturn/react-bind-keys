// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import BindKeys from './BindKeys';

const keyHandlers = {
  MOVE_LEFT: action('move-left'),
  MOVE_RIGHT: action('move-right'),
  MOVE_DOWN: action('move-down'),
  MOVE_UP: action('move-up'),
  MUTE: action('mute'),
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
    layout: 'fullscreen',
  },
} as Meta;

const Child = () => (
  <input
    tabIndex={-1}
    style={{
      display: 'flex',
    }}
  />
);

export const Default: Story = () => {
  return (
    <BindKeys keyMap={keyMap} keyHandlers={keyHandlers}>
      <Child />
    </BindKeys>
  );
};

function Modal({ children }: { children: React.ReactNode }) {
  const el = useRef(document.createElement('div'));
  const modalRoot = document.getElementById('root');

  useEffect(() => {
    if (modalRoot) {
      modalRoot.appendChild(el.current);
    }
    return () => {
      if (modalRoot) {
        modalRoot.removeChild(el.current);
      }
    };
  }, []);

  return ReactDOM.createPortal(children, el.current);
}

export const Portal: Story = () => {
  return (
    <div id="hi">
      <BindKeys keyMap={keyMap} keyHandlers={keyHandlers}>
        <Modal>
          <Child />
        </Modal>
      </BindKeys>
    </div>
  );
};
