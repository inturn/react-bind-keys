function getPath(path: string[], object: { [key: string]: any }): any {
  const nextDest = path.shift();
  if (nextDest === undefined) {
    return undefined;
  }

  if (path.length === 0) {
    return object[nextDest];
  }

  if (nextDest && typeof object[nextDest] === 'object') {
    return getPath(path, object[nextDest]);
  }
}

export default getPath;
