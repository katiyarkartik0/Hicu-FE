import { Node, NodeChange, applyNodeChanges } from "@xyflow/react";
import { useCallback, useState } from "react";

const initialNodes: Node[] = [];

function useNodes() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

  return { nodes, setNodes, onNodesChange };
}

export default useNodes;