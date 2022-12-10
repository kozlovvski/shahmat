import {
  ShahmatBoardState,
  ShahmatGameOptions,
  ShahmatValidator,
  STARTING_FEN,
  ShahmatGameInterface,
} from "@shahmat/utils";
import { decodeFEN } from "@shahmat/fen";

export class ShahmatGame implements ShahmatGameInterface {
  private boardState: ShahmatBoardState;
  static get #validator(): Promise<ShahmatValidator> {
    return import("@shahmat/validator").then((mod) => mod.default);
  }

  constructor({ fen, defaults }: ShahmatGameOptions = {}) {
    if (defaults?.validate) {
      // prefetch validator lib
      ShahmatGame.#validator;
    }

    if (fen) {
      this.boardState = decodeFEN(fen);
    } else {
      this.boardState = decodeFEN(STARTING_FEN);
    }
  }

  get pieces() {
    return this.boardState.pieces;
  }

  get activeColor() {
    return this.boardState.activeColor;
  }

  get castlingRights() {
    return this.boardState.castlingRights;
  }

  get enPassantTarget() {
    return this.boardState.enPassantTarget;
  }

  get halfmoveClock() {
    return this.boardState.halfmoveClock;
  }

  get moveNumber() {
    return this.boardState.halfmoveClock;
  }

  /** @inheritdoc */
  get moves() {
    return [];
  }
}
