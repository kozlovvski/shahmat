import { ChessboardSquare } from "../types/ChessboardSquare";
import { isChessboardColumn } from "./isChessboardColumn";
import { isChessboardRow } from "./isChessboardRow";

export const isChessboardSquare = (
  square: unknown
): square is ChessboardSquare =>
  typeof square === "string" &&
  square.length === 2 &&
  isChessboardColumn(square[0]) &&
  isChessboardRow(parseInt(square[1]));
