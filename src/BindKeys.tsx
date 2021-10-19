import React from 'react';

import useBindKeys from './lib/useBindKeys';

export default function BindKeys({
  children,
  keyMap,
  keyHandlers,
  preventDefault,
}: {
  children: React.ReactNode;
  keyHandlers: { [key: string]: (event: React.KeyboardEvent) => any };
  keyMap: {
    [key: string]: string[];
  };
  preventDefault?: boolean;
}) {
  const { handleKeyUp, handleKeyDown, handleBlur } = useBindKeys({
    keyMap,
    keyHandlers,
    preventDefault,
  });

  return (
    <div onKeyUp={handleKeyUp} onKeyDown={handleKeyDown} onBlur={handleBlur}>
      {children}
    </div>
  );
}
