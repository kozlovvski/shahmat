import { ROWS } from "../constants/rows";
import { ChessboardRow } from "../types/ChessboardRow";

export const isChessboardRow = (row: unknown): row is ChessboardRow =>
  ROWS.includes(row as ChessboardRow);
