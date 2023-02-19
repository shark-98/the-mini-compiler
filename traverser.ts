import { AllNode, CallExpressionNode, ChildrenNode, NodeTypes, RootNode, ParentNode } from './ast';

type VisitorMethod = (node: AllNode, parent: ParentNode) => void
interface VisitorOption {
  enter?: VisitorMethod
  exit?: VisitorMethod
}

export interface Visitor {
  Program?: VisitorOption
  CallExpression?: VisitorOption
  NumberLiteral?: VisitorOption
}

export const traverser = (root: RootNode, visitor: Visitor) => {

  function traverserArray(array: ChildrenNode[], parent: ParentNode) {
    array.forEach(node => {
      traverserNode(node, parent)
    })
  }

  function traverserNode(node: AllNode, parent?: ParentNode) {

    const method = visitor[node.type]
    method?.enter?.(node, parent)

    switch (node.type) {
      case NodeTypes.Program:
        traverserArray((node as RootNode).body, (node as RootNode))
        break;
      case NodeTypes.CallExpression:
        traverserArray((node as CallExpressionNode).params, (node as CallExpressionNode))
        break;
      case NodeTypes.NumberLiteral:
        break;

      default:
        break;
    }

    method?.exit?.(node, parent)
  }

  traverserNode(root)
};
