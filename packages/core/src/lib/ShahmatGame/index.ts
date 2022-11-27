import {
  ShahmatBoardState,
  ShahmatGameOptions,
  ShahmatValidator,
  STARTING_FEN,
} from "@shahmat/utils";
import { decodeFEN } from "@shahmat/fen";

export class ShahmatGame {
  boardState: ShahmatBoardState;
  static get #validator(): Promise<ShahmatValidator> {
    return import("@shahmat/validator").then((mod) => mod.default);
  }

  constructor({ fen, defaults }: ShahmatGameOptions) {
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
}
