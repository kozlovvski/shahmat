import type { ChessboardSquare } from "./ChessboardSquare";
import type { ChessPlayerColor } from "./ChessPlayerColor";
import { ShahmatCastlingRights } from "./ShahmatCastlingRights";
import { ShahmatPiecesDict } from "./ShahmatPiecesDict";

export type ShahmatBoardState = {
  pieces: ShahmatPiecesDict;
  activeColor: ChessPlayerColor;
  castlingRights: ShahmatCastlingRights;
  enPassantTarget: ChessboardSquare | null;
  halfmoveClock: number;
  moveNumber: number;
};
