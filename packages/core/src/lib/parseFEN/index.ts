/**
 * function that parses provided FEN string and returns configuration object
 */
 export function parseFEN(fenString: string): boolean {
  if (typeof fenString !== 'string') {
    throw Error('Provided argument is not a string');
  }

  const parts = fenString.split(' ');

  if (parts.length !== 6) {
    throw Error('FEN string should contain 6 parts separated by spaces');
  }

  return true;
}