import path from './path';

describe('path', () => {
  it('returns the value', () => {
    expect(path(['foo', 'bar'], { foo: { bar: 'bam' } })).toEqual('bam');
  });

  it('returns undefined if path does not exist', () => {
    expect(path(['foo', 'bam'], { foo: { bar: 'bam' } })).toEqual(undefined);
    expect(path(['bar'], { foo: { bar: 'bam' } })).toEqual(undefined);
    expect(path([], { foo: { bar: 'bam' } })).toEqual(undefined);
  });
});
