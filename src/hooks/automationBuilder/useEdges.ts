import type {
  IgReactFlowEdge,
  IgReactFlowNode,
} from "@/type/interfaces/igReactFlow";
import {
  Connection,
  EdgeChange,
  addEdge,
  applyEdgeChanges,
} from "@xyflow/react";
import { useCallback, useState } from "react";

const initialEdges: IgReactFlowEdge[] = [];

function useEdges() {
  const [edges, setEdges] = useState<IgReactFlowEdge[]>(initialEdges);
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges(
        (edgesSnapshot) =>
          applyEdgeChanges(changes, edgesSnapshot) as IgReactFlowEdge[]
      ),
    []
  );

  const onConnect = useCallback(
    (params: Connection, nodes: IgReactFlowNode[]) =>
      setEdges((edgesSnapshot) => {
        const sourceNodeType = nodes.find((n) => n.id === params.source)?.type;
        const targetNodeType = nodes.find((n) => n.id === params.target)?.type;
        const newEdge: IgReactFlowEdge = {
          id: `${params.source}-${params.target}-${Date.now()}`, // unique id
          ...params,
          sourceType: sourceNodeType ?? "__unknown__",
          targetType: targetNodeType ?? "__unknown__",
        };

        return addEdge(newEdge, edgesSnapshot);
      }),
    []
  );

  return { edges, setEdges, onEdgesChange, onConnect };
}

export default useEdges;
