import findSequenceHandler from './findSequenceHandler';

describe('findSequenceHandler', () => {
  it('finds a submatch', () => {
    const sequence = ['shift', 'tab', 'arrowdown'];
    const keyMapTrie = {
      shift: {
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

    expect(findSequenceHandler(sequence, keyMapTrie)).toBe('MOVE_DOWN');
  });

  it('finds an exact match before a submatch', () => {
    const sequence = ['shift', 'tab'];
    const keyMapTrie = {
      shift: {
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

    expect(findSequenceHandler(sequence, keyMapTrie)).toBe('MOVE_LEFT');
  });

  it('finds a match at the branch of the trie', () => {
    const sequence = ['shift'];
    const keyMapTrie = {
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

    expect(findSequenceHandler(sequence, keyMapTrie)).toBe('SELECT');
  });
});
