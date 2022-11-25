import type shahmatValidator from "@shahmat/validator"

type ShahmatOptions<Validate extends boolean> = {
  fen: string
  validate?: Validate
}

type ShahmatGame<Validate extends boolean> = {
  position: {},
} & (Validate extends true ? {
  validatePosition: () => Promise<string>
} : {})

export function createGame<Validate extends boolean = false>(options: ShahmatOptions<Validate>): ShahmatGame<Validate> {
  const position = {};
  let validator: typeof shahmatValidator;

  const setupPlugins = async () => {
    if(options.validate) {
      validator = (await import('@shahmat/validator')).default
    }
  }

  setupPlugins();
  
  const validatePosition = async () => {
    return validator()
  }

  return {
    position,
    validatePosition
  }
}