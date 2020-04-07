import generateKeyMapTrie from './generateKeyMapTrie';

describe('flattenKeyMap', () => {
  it('flattens correctly', () => {
    const mockKeyMap = {
      SELECT: ['shift'],
      MOVE_LEFT: ['shift+tab'],
      MOVE_RIGHT: ['tab'],
      MOVE_DOWN: ['arrowdown'],
    };

    const expected = {
      shift: {
        $handler: 'SELECT',
        tab: {
          $handler: 'MOVE_LEFT',
        },
      },
      tab: {
        $handler: 'MOVE_RIGHT',
      },
      arrowdown: {
        $handler: 'MOVE_DOWN',
      },
    };

    expect(generateKeyMapTrie(mockKeyMap)).toEqual(expected);
  });

  it('throws an error when there are duplicate key sequences', () => {
    const mockKeyMap = {
      SELECT: ['shift'],
      UNSELECT: ['shift'],
    };

    expect(() => generateKeyMapTrie(mockKeyMap)).toThrowError();
  });
});
