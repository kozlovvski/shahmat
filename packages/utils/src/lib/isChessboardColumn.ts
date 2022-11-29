import { COLUMNS } from "../constants/columns";
import { ChessboardColumn } from "../types/ChessboardColumn";

export const isChessboardColumn = (
  column: unknown
): column is ChessboardColumn => COLUMNS.includes(column as ChessboardColumn);
