export class ShahmatError extends Error {
  constructor(scope: string, message: string) {
    super(message);
    this.name = `ShahmatError(${scope})`;
    Error.captureStackTrace(this, ShahmatError);
  }
}
