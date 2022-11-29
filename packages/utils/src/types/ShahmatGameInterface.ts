import { ShahmatBoardState } from "./ShahmatBoardState";

export interface ShahmatGameInterface extends ShahmatBoardState {
  moves: Array<unknown>;
}
