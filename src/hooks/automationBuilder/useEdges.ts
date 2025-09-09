import {
  Edge,
  Connection,
  EdgeChange,
  addEdge,
  applyEdgeChanges,
} from "@xyflow/react";
import { useCallback, useState } from "react";

const initialEdges: Edge[] = [];

function useEdges() {
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return { edges, setEdges, onEdgesChange, onConnect };
}

export default useEdges;
