import { ShahmatBoardState } from "@shahmat/utils";
import { createFenError } from "../../errors/createFenError";
import {
  parseCastlingRights,
  parseEnPassantTarget,
  parseFENColor,
  parseHalfmoveClock,
  parseMoveNumber,
  parsePieces,
} from "./index.helpers";

/**
 * function that parses provided FEN string and returns configuration object
 */
export function decodeFEN(fenString: string): ShahmatBoardState {
  const argumentType = typeof fenString;
  if (argumentType !== "string") {
    throw createFenError("value type", argumentType);
  }

  const parts = fenString.split(" ");
  const partsNumber = parts.length;
  if (partsNumber !== 6) {
    throw createFenError("parts number", partsNumber);
  }

  const pieces = parsePieces(parts[0]);
  const activeColor = parseFENColor(parts[1]);
  const castlingRights = parseCastlingRights(parts[2]);
  const enPassantTarget = parseEnPassantTarget(parts[3]);
  const halfmoveClock = parseHalfmoveClock(parts[4]);
  const moveNumber = parseMoveNumber(parts[5], halfmoveClock);

  return {
    pieces,
    activeColor,
    castlingRights,
    enPassantTarget,
    halfmoveClock,
    moveNumber,
  };
}
