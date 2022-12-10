import { ShahmatBoardState } from "./ShahmatBoardState";

export interface ShahmatGameInterface extends ShahmatBoardState {
  /** returns moves */
  moves: Array<unknown>;
}
