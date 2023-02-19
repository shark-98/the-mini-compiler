import { NodeTypes, RootNode, ParentNode, CallExpressionNode, NumberNode } from './ast';
import { traverser } from './traverser';

export const transformer = (ast: RootNode) => {
  const newAst = {
    type: NodeTypes.Program,
    body: []
  }

  ast.context = newAst.body

  const visitor = {
    CallExpression: {
      enter(node, parent) {
        let expression: any = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: []
        }

        node.context = expression.arguments

        if (parent?.type !== NodeTypes.CallExpression) {
          expression = {
            type: "ExpressionStatement",
            expression
          }
        }

        parent?.context.push(expression)
      }
    },
    NumberLiteral: {
      enter(node, parent) {
        const number = {
          type: "NumberLiteral",
          value: node.value,
        }
        parent?.context.push(number)
      }
    }
  }
  traverser(ast, visitor)

  return newAst
};
