import { Edge, Node } from "@xyflow/react";

interface AdditionalIgReactFlowNodeInfo extends Record<string, unknown> {
  label: string;
  description: string;
  hasConditionalEdges: boolean;
  prototypeResponse?: string;
  aiPrompt?: string;
}

export type IgReactFlowNode = Node<AdditionalIgReactFlowNodeInfo>;

export type IgReactFlowEdge = Edge;