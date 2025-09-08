import { useState, useCallback } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Node,
  Edge,
  Connection,
  NodeChange,
  EdgeChange,
  Background,
  MiniMap,
  Controls,
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodePalette } from "./NodePalette";
import Decision from "./Nodes/Decision";
import Trigger from "./Nodes/Trigger";
import End from "./Nodes/End";
import Dm from "./Nodes/Dm";
import ReplyToComment from "./Nodes/CommentReply";
import CommentReply from "./Nodes/CommentReply";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

export default function AutomationBuilder() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );

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

  // Check if a trigger node already exists
  const hasTrigger = nodes.some((n) => n.data?.label === "__start__");

  // Add a new node to the canvas
  const handleAddNode = (
    type:
      | "trigger"
      | "end"
      | "decision"
      | "dm"
      | "commentReply"
      | "commentReplyAiVectorDb"
      | "commentReplyAi"
      | "commentReplyManual"
  ) => {
    const id = `${type}-${nodes.length + 1}`;
    const position = { x: Math.random() * 400, y: Math.random() * 400 }; // quick demo positioning

    let label = "";
    switch (type) {
      case "trigger":
        label = "__start__";
        break;
      case "end":
        label = "__end__";
        break;
      case "decision":
        label = "Decision";
        break;
      case "dm":
        label = "send DM";
        break;
      case "commentReply":
        label = "Reply to Comment";
        break;
    }

    setNodes((prev) => [...prev, { id, type, position, data: { label } }]);
  };

  const nodeTypes: NodeTypes = {
    decision: (props) => (
      <Decision {...props} handleAddChild={handleAddChild} />
    ),
    trigger: Trigger,
    end: End,
    dm: Dm,
    commentReply: CommentReply,
  };

  const handleAddChild = (parentId: string, label: string) => {
    setNodes((prev) => {
      const newId = `child-${prev.length + 1}`;

      // Count children of this parent
      const childCount = prev.filter((n) => n.parentId === parentId).length;

      // Slot size per child
      const childSlot = 150;
      const padding = 40;

      return prev
        .map((n) => {
          if (n.id === parentId) {
            const baseWidth =
              typeof n.style?.width === "number" ? n.style.width : 400; // fallback

            // Parent width grows linearly with children
            const newWidth = Math.max(
              baseWidth,
              (childCount + 1) * childSlot + padding
            );
            return {
              ...n,
              style: {
                ...n.style,
                width: newWidth,
              },
            };
          }
          return n;
        })
        .concat({
          id: newId,
          type: "default",
          data: { label },
          parentId: parentId,
          extent: "parent",
          position: {
            x: 40 + childCount * childSlot,
            y: 100,
          },
          style: {
            width: childSlot - 20,
            height: 50,
          },
        });
    });
  };

  return (
    <div className="flex w-full h-full">
      {/* Left side palette */}
      <div className="w-64 border-r">
        <NodePalette onAddNode={handleAddNode} hasTrigger={hasTrigger} />
      </div>

      {/* Flow canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
