import type { ChessboardSide } from "./ChessboardSide";
import type { ChessPlayerColor } from "./ChessPlayerColor";

export type ShahmatCastlingRights = Record<
  ChessPlayerColor,
  Record<ChessboardSide, boolean>
>;
