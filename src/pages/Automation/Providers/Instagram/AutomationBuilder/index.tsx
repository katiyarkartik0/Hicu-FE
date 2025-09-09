import {
  ReactFlow,
  Background,
  MiniMap,
  Controls,
  NodeTypes,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodePalette } from "./NodePalette";
import { nodeDefinitions } from "./Nodes";
import useNodes from "@/hooks/automationBuilder/useNodes";
import useEdges from "@/hooks/automationBuilder/useEdges";

function constructNodeTypes({
  setNodes,
}: {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}): NodeTypes {
  const nodeTypes: NodeTypes = Object.fromEntries(
    nodeDefinitions.map(({ type, component }) => {
      return [type, (props) => component({ ...props, setNodes })];
    })
  );
  return nodeTypes;
}

export default function AutomationBuilder() {
  const { nodes, setNodes, onNodesChange } = useNodes();
  const { edges, onEdgesChange, onConnect } = useEdges();

  const nodeTypes: NodeTypes = constructNodeTypes({ setNodes });

  return (
    <div className="flex w-full h-full">
      {/* Left side palette */}
      <div className="w-64 border-r">
        <NodePalette setNodes={setNodes} />
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
