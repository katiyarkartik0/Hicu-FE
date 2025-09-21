import { Edge, Node } from "@xyflow/react";

interface AdditionalIgReactFlowNodeInfo extends Record<string, unknown> {
  label: string;
  description: string;
  hasConditionalEdges: boolean;
  prototypeResponse?: string;
  aiPrompt?: string;
  conditionalEdgesToNodes?: { condition: string; route: string }[];
}

export type IgReactFlowNode = Node<AdditionalIgReactFlowNodeInfo>;

export interface IgReactFlowEdge extends Edge {
  sourceType: string;
  targetType: string;
}

// export type IgReactFlowEdge = Edge;
