import {
  ReactFlow,
  Background,
  MiniMap,
  Controls,
  NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodePalette } from "./NodePalette";
import { nodeDefinitions } from "./nodes";
import useNodes from "@/hooks/automationBuilder/useNodes";
import useEdges from "@/hooks/automationBuilder/useEdges";
import { useEffect, useMemo } from "react";
import type { IgReactFlowNode } from "@/type/interfaces/igReactFlow";
import Button from "@/components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { igReactFlowService } from "@/services/igReactFlow";
import { useNumericParam } from "@/hooks/react-router";
import Loader from "@/components/ui/Loader";
import { useParams } from "react-router-dom";

function constructNodeTypes({
  setNodes,
}: {
  setNodes: React.Dispatch<React.SetStateAction<IgReactFlowNode[]>>;
}): NodeTypes {
  const nodeTypes: NodeTypes = Object.fromEntries(
    nodeDefinitions.map(({ type, component }) => {
      return [type, (props) => component({ ...props, setNodes })];
    })
  );
  return nodeTypes;
}

const useCreateNodes = () => {
  return useMutation({
    mutationFn: igReactFlowService.upsertNodes,
  });
};

const useCreateEdges = () => {
  return useMutation({
    mutationFn: igReactFlowService.upsertEdges,
  });
};

export default function AutomationBuilder() {
  const { nodes, setNodes, onNodesChange } = useNodes();
  const { edges, setEdges, onEdgesChange, onConnect } = useEdges();
  const brandId = useNumericParam("brandId");
  const automationId = useNumericParam("automationId");
  const { mediaId } = useParams();

  if (!brandId || !mediaId || !automationId) return null;

  console.log(edges, "check");

  const { data: savedNodes } = useQuery({
    queryFn: () => igReactFlowService.fetchNodes({ automationId }),
    queryKey: ["igReactFlowNodes", automationId],
  });

  const { data: savedEdges } = useQuery({
    queryFn: () => igReactFlowService.fetchEdges({ automationId }),
    queryKey: ["igReactFlowEdges", automationId],
  });
  useEffect(() => {
    if (savedNodes) {
      setNodes(savedNodes);
    }
    if (savedEdges) {
      setEdges(savedEdges);
    }
  }, [savedNodes, savedEdges]);

  const nodeTypes: NodeTypes = useMemo(
    () => constructNodeTypes({ setNodes }),
    [setNodes]
  );

  const { mutateAsync: upsertNodesAsync, isPending } = useCreateNodes();
  const { mutateAsync: upsertEdgesAsync } = useCreateEdges();

  const handleSaveAutomation = async () => {
    await upsertNodesAsync({ automationId, brandId, mediaId, nodes });
    await upsertEdgesAsync({ automationId, brandId, mediaId, edges });
  };

  return (
    <div className="flex w-full h-full">
      {/* Left side palette */}
      <div className="w-64 border-r flex flex-col content-between items-center gap-4">
        <NodePalette setNodes={setNodes} />
        {!isPending ? (
          <Button onClick={handleSaveAutomation}>Save Automation</Button>
        ) : (
          <Loader />
        )}
      </div>

      {/* Flow canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={(params) => onConnect(params, nodes)}
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
