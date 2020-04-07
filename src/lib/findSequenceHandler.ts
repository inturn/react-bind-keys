import path from './path';

export default function findSequenceHandler(
  sequence: string[],
  keyMapTrie: any,
): string | null {
  const sequenceValues = [...sequence];
  // checkForExact first
  const exactPath: string | undefined = path(
    [...sequenceValues, '$handler'],
    keyMapTrie,
  );

  if (exactPath) {
    return exactPath;
  }

  sequenceValues.shift();
  if (sequenceValues.length > 0) {
    return findSequenceHandler(sequenceValues, keyMapTrie);
  }

  return null;
}
