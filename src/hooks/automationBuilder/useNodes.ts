import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";
import { NodeChange, NodeRemoveChange, applyNodeChanges } from "@xyflow/react";
import { useCallback, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { igReactFlowService } from "@/services/igReactFlow";

const initialNodes: IgReactFlowNode[] = [];

function getidsOfRemovedNodes(changes: NodeChange[]) {
  return changes
    .filter((c): c is NodeRemoveChange => c.type === "remove")
    .map((c) => c.id);
}

function useNodes() {
  const [nodes, setNodes] = useState<IgReactFlowNode[]>(initialNodes);

  // --- React Query mutation for deleting a node ---
  const deleteNodeMutation = useMutation({
    mutationFn: async (nodeId: string) => {
      return igReactFlowService.deleteNode(nodeId);
    },
    onSuccess: (_data, nodeId) => {
      // Only remove node from state when delete is confirmed
      setNodes((prev) => prev.filter((n) => n.id !== nodeId));
    },
    onError: (err) => {
      console.error("Failed to delete node:", err);
    },
  });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      // Detect removed nodes
      const removedNodes = getidsOfRemovedNodes(changes);

      if (removedNodes.length > 0) {
        // Instead of applying changes immediately, wait for mutation success
        removedNodes.forEach((id) => deleteNodeMutation.mutate(id));
      } else {
        // Apply all other changes (move, select, etc.)
        setNodes(
          (nodesSnapshot) =>
            applyNodeChanges(changes, nodesSnapshot) as IgReactFlowNode[]
        );
      }
    },
    [deleteNodeMutation]
  );

  const deleteNode = useCallback(
    (nodeId: string) => {
      deleteNodeMutation.mutate(nodeId);
    },
    [deleteNodeMutation]
  );

  return { nodes, setNodes, onNodesChange, deleteNode, deleteNodeMutation };
}

export default useNodes;
