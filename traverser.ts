import { AllNode, CallExpressionNode, ChildrenNode, NodeTypes, RootNode } from './ast';

type ParentNode = RootNode | CallExpressionNode | undefined;

interface VisitorOption {
  enter: (node: AllNode, parent: ParentNode) => void
  exit: (node: AllNode, parent: ParentNode) => void
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
    if (method) {
      method?.enter(node, parent)
    }

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

    if (method) {
      method?.exit(node, parent)
    }
  }

  traverserNode(root)
};
