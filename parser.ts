import { createCallExpressionNode, createNumberNode, createRootNode, createStringNode } from "./ast";
import { LEFT_PAREN, RIGHT_PAREN, Tokens, TokenTypes } from "./tokenizer";

export const parser = (tokens: Tokens) => {
  let current = 0
  const root = createRootNode()

  function walk() {
    let token = tokens[current]
    if (token.type === TokenTypes.Number) {
      current++
      return createNumberNode(token.value)
    }

    if (token.type === TokenTypes.Name) {
      current++
      return createStringNode(token.value)
    }

    if (token.type === TokenTypes.Paren && token.value === LEFT_PAREN) {
      token = tokens[++current]
      const node = createCallExpressionNode(token.value)

      token = tokens[++current]
      while (!(token.type === TokenTypes.Paren && token.value === RIGHT_PAREN)) {
        node.params.push(walk())
        token = tokens[current];
      }

      current++
      return node
    }

    throw new Error(`识别不了的 token: ${token}`);
  }

  while (current < tokens.length) {
    root.body.push(walk())
  }

  return root
}
