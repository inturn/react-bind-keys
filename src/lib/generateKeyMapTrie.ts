interface Trie {
  [key: string]: {};
}

export default function(keyMap: { [key: string]: string[] }): Trie {
  let trie: Trie = {};
  const keyMapEntries = Object.entries(keyMap);

  for (let i = 0; i < keyMapEntries.length; i += 1) {
    const [handler, sequences] = keyMapEntries[i];

    for (let j = 0; j < sequences.length; j += 1) {
      const keys = sequences[j].split('+');
      const branch = {
        ...trie,
      };

      let pos = branch;

      for (let h = 0; h < keys.length; h += 1) {
        const cur = pos[keys[h]];
        if (h === keys.length - 1) {
          // for now we only allow one handler per sequence
          if (typeof cur === 'object' && '$handler' in cur) {
            throw new Error('duplicate handler for key sequence');
          }

          pos = pos[keys[h]] = {
            ...cur,
            $handler: handler,
          };
        } else {
          pos = pos[keys[h]] = {
            ...cur,
          };
        }
      }

      trie = branch;
    }
  }

  return trie;
}
