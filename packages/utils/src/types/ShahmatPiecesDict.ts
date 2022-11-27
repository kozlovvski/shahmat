import type { ChessboardSquare } from "./ChessboardSquare";
import type { Chesspiece } from "./Chesspiece";

export type ShahmatPiecesDict = Partial<Record<ChessboardSquare, Chesspiece>>;
