export class ParserError extends Error {
  constructor(reason: string, context: any) {
    super(`Invalid ${reason}: ${context}`)
    this.name = 'ParserError'
  }
}