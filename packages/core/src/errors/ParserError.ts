export class ParserError extends Error {
  constructor(reason: string, context: unknown) {
    super(`Invalid ${reason}: ${context}`);
    this.name = "ParserError";
  }
}
