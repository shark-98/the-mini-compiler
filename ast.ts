export enum NodeTypes {
  Program = 'Program',
  CallExpression = 'CallExpression',
  NumberLiteral = 'NumberLiteral',
  StringLiteral = 'StringLiteral',
}

interface Node {
  type: NodeTypes
}

export interface NumberNode extends Node {
  value: string
}
export interface StringNode extends Node {
  value: string
}
export interface CallExpressionNode extends Node {
  name: string,
  params: ChildrenNode[],
  context?: any
}

export type ChildrenNode = NumberNode | StringNode | CallExpressionNode
export type AllNode = ChildrenNode | RootNode

export type ParentNode = RootNode | CallExpressionNode | undefined;

export interface RootNode extends Node {
  body: ChildrenNode[],
  context?: ChildNode[]
}

export const createRootNode = (): RootNode => {
  return {
    type: NodeTypes.Program,
    body: [],
  }
}

export const createNumberNode = (value: string): NumberNode => {
  return {
    type: NodeTypes.NumberLiteral,
    value
  }
}

export const createStringNode = (value: string): StringNode => {
  return {
    type: NodeTypes.StringLiteral,
    value
  }
}

export const createCallExpressionNode = (name: string): CallExpressionNode => {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: []
  }
}
