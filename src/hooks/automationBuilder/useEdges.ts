import type{ IgReactFlowEdge } from "@/type/interfaces/igReactFlow";
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
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params: IgReactFlowEdge | Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return { edges, setEdges, onEdgesChange, onConnect };
}

export default useEdges;
