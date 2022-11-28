import { EnPassantTargetSquare } from "../types/EnPassantTargetSquare";
import { isChessboardColumn } from "./isChessboardColumn";
import { isChessboardRow } from "./isChessboardRow";

export const isEnPassantTarget = (
  square: unknown
): square is EnPassantTargetSquare =>
  typeof square === "string" &&
  square.length === 2 &&
  isChessboardColumn(square[0]) &&
  isChessboardRow(parseInt(square[1]));
