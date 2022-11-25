type ShahmatOptions<Validate extends boolean> = {
  fen: string
  validate?: Validate
}

type ShahmatGame<Validate extends boolean> = {
  position: {},
} & (Validate extends true ? {
  validatePosition: () => Promise<boolean>
} : {})

export function createGame<Validate extends boolean = false>(options: ShahmatOptions<Validate>): ShahmatGame<Validate> {
  const position = {};
  
  const __validatePosition = async () => {
    const {validatePosition} = await import('@shahmat/validator')

    return validatePosition()
  }

  const returnObject: ShahmatGame<Validate> = {
    position,
    validatePosition: options.validate ? __validatePosition : undefined
  }
  
  return returnObject
}

const game = createGame({
  fen: '',
  validate: true
});

game.validatePosition