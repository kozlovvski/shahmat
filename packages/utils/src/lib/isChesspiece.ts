import { PIECES } from "../constants/pieces";
import { Chesspiece } from "../types/Chesspiece";

export const isChesspiece = (piece: unknown): piece is Chesspiece =>
  PIECES.includes(piece as Chesspiece);
