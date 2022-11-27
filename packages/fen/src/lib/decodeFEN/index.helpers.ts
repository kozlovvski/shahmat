import {
  ChessboardRow,
  ChessboardSquare,
  ChessPlayerColor,
  COLUMNS,
  isChesspiece,
  ShahmatCastlingRights,
  ShahmatPiecesDict,
  isChessboardSquare,
} from "@shahmat/utils";
import { createFenError } from "../../errors/createFenError";

export const parsePieces = (rowsPart: string) => {
  const rows = rowsPart.split("/");
  const rowsNumber = rows.length;
  if (rowsNumber !== 6) {
    throw createFenError("rows number", rowsNumber);
  }

  return rows.reduce<ShahmatPiecesDict>((currentPieces, row, rowIndex) => {
    const rowNumber = (8 - rowIndex) as ChessboardRow;
    let columnNumber = 0;

    for (let i = 1; i < row.length; ) {
      const pieceOrRowsToSkip = row[i];
      const rowsToSkip = parseInt(pieceOrRowsToSkip);

      if (isNaN(rowsToSkip)) {
        if (isChesspiece(pieceOrRowsToSkip)) {
          const square: ChessboardSquare = `${COLUMNS[columnNumber]}${rowNumber}`;
          currentPieces[square] = pieceOrRowsToSkip;
          columnNumber++;
          continue;
        } else {
          throw createFenError("piece", pieceOrRowsToSkip);
        }
      }

      if (rowsToSkip > 0 && rowsToSkip < 8) {
        columnNumber += rowsToSkip;
        continue;
      } else {
        throw createFenError("number of rows to skip", rowsToSkip);
      }
    }

    return currentPieces;
  }, {});
};

type FENColor = "w" | "b";

const isFENColor = (color: string): color is FENColor =>
  ["w", "b"].includes(color);

export const parseFENColor = (activeColorPart: string): ChessPlayerColor => {
  const colorsDict = { w: "white", b: "black" } as const;
  if (isFENColor(activeColorPart)) {
    return colorsDict[activeColorPart];
  }

  throw createFenError("active color", activeColorPart);
};

export const parseCastlingRights = (
  castlingRightsPart: string
): ShahmatCastlingRights => {
  const fenRightsError = createFenError("castling rights", castlingRightsPart);
  const defaultRights = {
    queenside: false,
    kingside: false,
  };
  const rights: ShahmatCastlingRights = {
    white: defaultRights,
    black: defaultRights,
  };

  const fenRightsLength = castlingRightsPart.length;
  if (castlingRightsPart.length > 4) {
    throw fenRightsError;
  }

  for (let i = 0; i < fenRightsLength; i++) {
    const currentRight = castlingRightsPart[i];

    switch (currentRight) {
      case "K":
        rights.white.kingside = true;
        break;
      case "Q":
        rights.white.queenside = true;
        break;
      case "k":
        rights.black.kingside = true;
        break;
      case "q":
        rights.black.kingside = true;
        break;
      default:
        throw fenRightsError;
    }
  }

  return rights;
};

export const parseEnPassantTarget = (
  enPassantPart: string
): ChessboardSquare | null => {
  if (enPassantPart === "-") {
    return null;
  }

  if (isChessboardSquare(enPassantPart)) {
    return enPassantPart;
  }

  throw createFenError("en passant square", enPassantPart);
};

export const parseHalfmoveClock = (halfmovePart: string): number => {
  const clock = Number(halfmovePart);

  if (Number.isInteger(clock) && clock >= 0 && clock <= 50) {
    return clock;
  }

  throw createFenError("halfmove", halfmovePart);
};

export const parseMoveNumber = (
  moveNumberPart: string,
  halfmove: number
): number => {
  const FULLMOVE = "fullmove";
  const clock = Number(moveNumberPart);

  if (clock <= halfmove) {
    throw createFenError(FULLMOVE + " - smaller than halfmove", moveNumberPart);
  }
  if (Number.isInteger(clock) && clock >= 0) {
    return clock;
  }

  throw createFenError(FULLMOVE, moveNumberPart);
};
