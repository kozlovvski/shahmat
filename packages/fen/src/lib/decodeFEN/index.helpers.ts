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

const WHITE = "white" as const;
const BLACK = "black" as const;
const FULLMOVE = "fullmove" as const;
const HALFMOVE = "halfmove" as const;
const QUEENSIDE = "queenside" as const;
const KINGSIDE = "kingside" as const;

export const parsePieces = (rowsPart: string) => {
  const rows = rowsPart.split("/");
  const rowsNumber = rows.length;
  if (rowsNumber !== 8) {
    throw createFenError("rows number", rowsNumber);
  }

  return rows.reduce<ShahmatPiecesDict>((currentPieces, row, rowIndex) => {
    const rowNumber = (8 - rowIndex) as ChessboardRow;
    let columnNumber = 0;

    const checkColumnNumber = () => {
      if (columnNumber > 8) {
        throw createFenError("total number of columns", row);
      }
    };

    for (let i = 0; i < row.length; i++) {
      const pieceOrColumnsToSkip = row[i];
      const columnsToSkip = parseInt(pieceOrColumnsToSkip);

      if (isNaN(columnsToSkip)) {
        if (isChesspiece(pieceOrColumnsToSkip)) {
          const square: ChessboardSquare = `${COLUMNS[columnNumber]}${rowNumber}`;
          currentPieces[square] = pieceOrColumnsToSkip;
          columnNumber++;
          checkColumnNumber();
          continue;
        } else {
          throw createFenError("piece", pieceOrColumnsToSkip);
        }
      }
      columnNumber += columnsToSkip;
      checkColumnNumber();
    }

    return currentPieces;
  }, {});
};

type FENColor = "w" | "b";

const isFENColor = (color: string): color is FENColor =>
  ["w", "b"].includes(color);

export const parseFENColor = (activeColorPart: string): ChessPlayerColor => {
  const colorsDict = { w: WHITE, b: BLACK } as const;
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
    [QUEENSIDE]: false,
    [KINGSIDE]: false,
  };
  const rights: ShahmatCastlingRights = {
    [WHITE]: defaultRights,
    [BLACK]: defaultRights,
  };

  if (castlingRightsPart === "-") {
    return rights;
  }

  const fenRightsLength = castlingRightsPart.length;
  if (!/^K?Q?k?q?$/.test(castlingRightsPart)) {
    throw fenRightsError;
  }

  for (let i = 0; i < fenRightsLength; i++) {
    const currentRight = castlingRightsPart[i];

    switch (currentRight) {
      case "K":
        rights[WHITE][KINGSIDE] = true;
        break;
      case "Q":
        rights[WHITE][QUEENSIDE] = true;
        break;
      case "k":
        rights[BLACK][KINGSIDE] = true;
        break;
      case "q":
        rights[BLACK][QUEENSIDE] = true;
        break;
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

  throw createFenError(HALFMOVE, halfmovePart);
};

export const parseMoveNumber = (
  moveNumberPart: string,
  halfmove: number
): number => {
  const clock = Number(moveNumberPart);

  if (clock <= halfmove) {
    throw createFenError(FULLMOVE + " - smaller than halfmove", moveNumberPart);
  }
  if (Number.isInteger(clock) && clock >= 0) {
    return clock;
  }

  throw createFenError(FULLMOVE, moveNumberPart);
};
