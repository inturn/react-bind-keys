import { cleanup, fireEvent, render } from '@testing-library/react';
import React, { useRef } from 'react';

import useHotkeys from './useHotkeys';

describe('useTableHotkeys()', () => {
  const keyMap = {
    MOVE_LEFT: ['arrowleft', 'shift+tab'],
    MOVE_RIGHT: ['arrowright', 'tab'],
    MOVE_DOWN: ['arrowdown'],
    MOVE_UP: ['arrowup'],
    MUTE: ['meta+e', 'e+meta'],
  };

  let keyHandlers = {
    MOVE_LEFT: jest.fn(),
    MOVE_RIGHT: jest.fn(),
    MOVE_DOWN: jest.fn(),
    MOVE_UP: jest.fn(),
    MUTE: jest.fn(),
  };

  afterEach(() => {
    cleanup();
    keyHandlers = {
      MOVE_LEFT: jest.fn(),
      MOVE_RIGHT: jest.fn(),
      MOVE_DOWN: jest.fn(),
      MOVE_UP: jest.fn(),
      MUTE: jest.fn(),
    };
  });

  function Test({
    preventDefault,
    children,
  }: {
    preventDefault?: boolean;
    children?: React.ReactNode;
  }): React.ReactElement {
    const keyWrapperRef = useRef(null);

    useHotkeys(keyWrapperRef, {
      keyMap,
      keyHandlers,
      preventDefault,
    });

    return (
      <div ref={keyWrapperRef} data-testid="test">
        {children}
      </div>
    );
  }

  it('calls the handler for a single keypresss', () => {
    const { getByTestId } = render(<Test />);
    fireEvent.keyDown(getByTestId('test'), { key: 'ArrowRight' });

    expect(keyHandlers.MOVE_RIGHT).toHaveBeenCalledTimes(1);
  });

  it('calls the handler for a combination keypress', () => {
    const { getByTestId } = render(<Test />);
    fireEvent.keyDown(getByTestId('test'), { key: 'Shift' });
    fireEvent.keyDown(getByTestId('test'), { key: 'E' });
    fireEvent.keyUp(getByTestId('test'), { key: 'E' });
    fireEvent.keyDown(getByTestId('test'), { key: 'Tab' });

    expect(keyHandlers.MOVE_LEFT).toHaveBeenCalledTimes(1);
  });

  it('does not call the handler for a combination keypress if part of the sequence is released', () => {
    const { getByTestId } = render(<Test />);
    fireEvent.keyDown(getByTestId('test'), { key: 'Shift' });
    fireEvent.keyUp(getByTestId('test'), { key: 'Shift' });
    fireEvent.keyDown(getByTestId('test'), { key: 'Tab' });

    expect(keyHandlers.MOVE_LEFT).toHaveBeenCalledTimes(0);
    expect(keyHandlers.MOVE_RIGHT).toHaveBeenCalledTimes(1);
  });

  it('calls the handler twice when triggered in succession', () => {
    const { getByTestId } = render(<Test />);
    fireEvent.keyDown(getByTestId('test'), { key: 'ArrowRight' });
    expect(keyHandlers.MOVE_RIGHT).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(getByTestId('test'), { key: 'ArrowRight' });
    expect(keyHandlers.MOVE_RIGHT).toHaveBeenCalledTimes(2);
  });

  it('does not call the handler for a combination keypress if window got blurred', () => {
    const { getByTestId } = render(<Test />);
    fireEvent.keyDown(getByTestId('test'), { key: 'Shift' });
    fireEvent.blur(window);
    fireEvent.keyDown(getByTestId('test'), { key: 'Tab' });

    expect(keyHandlers.MOVE_LEFT).toHaveBeenCalledTimes(0);
    expect(keyHandlers.MOVE_RIGHT).toHaveBeenCalledTimes(1);
  });

  it('does not call the handler for a combination keypress if window got blurred', () => {
    const { getByTestId } = render(<Test />);
    fireEvent.keyDown(getByTestId('test'), { key: 'Shift' });
    fireEvent.blur(window);
    fireEvent.keyDown(getByTestId('test'), { key: 'Tab' });

    expect(keyHandlers.MOVE_LEFT).toHaveBeenCalledTimes(0);
    expect(keyHandlers.MOVE_RIGHT).toHaveBeenCalledTimes(1);
  });
  it('properly swallows the sequence when meta is hit', () => {
    const { getByTestId } = render(<Test />);
    fireEvent.keyDown(getByTestId('test'), { key: 'Meta' });
    fireEvent.keyDown(getByTestId('test'), { key: 'F' });
    fireEvent.keyUp(getByTestId('test'), { key: 'Meta' });
    fireEvent.keyDown(getByTestId('test'), { key: 'Meta' });
    fireEvent.keyDown(getByTestId('test'), { key: 'E' });

    expect(keyHandlers.MUTE).toHaveBeenCalledTimes(1);
  });
});
