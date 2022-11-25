import { parseFEN } from '.';

describe('parseFEN', () => {
  it('throws when argument is not a string', () => {
    expect(() => parseFEN([] as any)).toThrow();
  });

  it('throws when string is not a FEN string', () => {
    expect(() => parseFEN('dummy string')).toThrow();
  });
});