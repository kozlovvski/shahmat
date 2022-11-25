import {ParserError} from "../../errors/ParserError"

/**
 * function that parses provided FEN string and returns configuration object
 */
 export function parseFEN(fenString: string): boolean {
  const argumentType = typeof fenString
  if (argumentType !== 'string') {
    throw new ParserError('value type', argumentType)
  }

  const parts = fenString.split(' ');

  const partsNumber = parts.length
  if (partsNumber !== 6) {
    throw new ParserError('parts number', partsNumber);
  }

  return true;
}