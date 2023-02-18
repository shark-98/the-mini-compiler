export enum TokenTypes {
  Paren,
  Name,
  Number
}
interface Token {
  type: TokenTypes,
  value: string
}
export type Tokens = Token[]

export const LEFT_PAREN = '('
export const RIGHT_PAREN = ')'
const leftOrRightParen = [LEFT_PAREN, RIGHT_PAREN]
const isLeftOrRightParen = (char: string): boolean => {
  return leftOrRightParen.includes(char)
}

let current = 0
const initCurrent = () => {
  current = 0
}
const advanceCurrent = () => {
  current++
}

let char = ''
const initChar = () => {
  char = ''
}
const setChar = (val: string) => {
  char = val
}

const handleSpace = (): boolean => {
  const SPACE_REGEX = /\s/

  return SPACE_REGEX.test(char)
}
const handleLeftOrRightParen = (tokens: Tokens): boolean => {
  if (!isLeftOrRightParen(char)) {
    return false
  }

  tokens.push({
    type: TokenTypes.Paren,
    value: char
  })
  return true
}

const handleRegex = (regex: RegExp, code: string, sourceLength: number): string => {
  let result = ''

  if (regex.test(char)) {
    while (current < sourceLength && regex.test(char)) {
      result += char
      advanceCurrent()
      char = code[current]
    }
  }

  return result
}
const handleName = (tokens: Tokens, code: string, sourceLength: number): boolean => {
  const NAME_REGEX = /[a-z]/i
  const value = handleRegex(NAME_REGEX, code, sourceLength)
  if (value) {
    tokens.push({
      type: TokenTypes.Name,
      value
    })
  }

  return !!value
}
const handleNumber = (tokens: Tokens, code: string, sourceLength: number): boolean => {
  const NUMBER_REGEX = /[0-9]/
  const value = handleRegex(NUMBER_REGEX, code, sourceLength)
  if (value) {
    tokens.push({
      type: TokenTypes.Number,
      value
    })
  }

  return !!value
}

export const tokenizer = (code: string): Tokens => {
  const sourceLength = code.length
  const tokens: Tokens = []
  initCurrent()
  initChar()

  while (current < sourceLength) {
    setChar(code[current])

    if (handleSpace() || handleLeftOrRightParen(tokens)) {
      advanceCurrent()
      continue
    }

    if (handleName(tokens, code, sourceLength) || handleNumber(tokens, code, sourceLength)) {
      continue
    }
  }

  return tokens
};
