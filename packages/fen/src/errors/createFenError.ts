import { ShahmatError } from "@shahmat/utils";

export const createFenError = (reason: string, context: unknown) =>
  new ShahmatError("fen", `Invalid ${reason}: ${context}`);
