import API_BASE_URL from "@/constants";
import { LOCAL_STORAGE_KEY, storage } from "@/lib/utils";
import type {
  IgReactFlowEdge,
  IgReactFlowNode,
} from "@/type/interfaces/igReactFlow";
import { Edge } from "@xyflow/react";

const DEFAULT_NODE_WIDTH = 200;
const DEFAULT_NODE_HEIGHT = 80;

export const igReactFlowService = {
  fetchNodes: async ({
    automationId,
  }: {
    automationId: number;
  }): Promise<IgReactFlowNode[]> => {
    const ENDPOINT = `${API_BASE_URL}/igReactFlow/nodes/${automationId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const response = await fetch(ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to fetch all the nodes (HTTP ${response.status})`
      );
    }

    const data = result.data;
    return data.map((n: any) => ({
      id: n.nodeId,
      type: n.type,
      position: {
        x: n.positionX,
        y: n.positionY,
      },
      measured: {
        width: n.width,
        height: n.height,
      },
      dragging: n.dragging,
      selected: n.selected,
      data: {
        label: n.data?.label,
        description: n.data?.description,
        prototypeResponse: n.data?.prototypeResponse,
        aiPrompt: n.data?.aiPrompt,
        hasConditionalEdges: n.data?.hasConditionalEdges,
      },
    }));
  },
  upsertNodes: async ({
    automationId,
    brandId,
    mediaId,
    nodes,
  }: {
    automationId: number;
    brandId: number;
    mediaId: string;
    nodes: IgReactFlowNode[];
  }) => {
    const ENDPOINT = `${API_BASE_URL}/igReactFlow/nodes/upsert`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const accountId = brandId;
    // Prisma-compatible node structure
    const prismaNodes = nodes.map((n) => ({
      nodeId: n.id,
      type: n.type,
      positionX: n.position.x,
      positionY: n.position.y,
      width: n.measured?.width ?? DEFAULT_NODE_WIDTH,
      height: n.measured?.height ?? DEFAULT_NODE_HEIGHT,
      dragging: n.dragging ?? false,
      selected: n.selected ?? false,
      data: {
        label: n.data.label,
        description: n.data.description,
        prototypeResponse: n.data.prototypeResponse ?? null,
        aiPrompt: n.data.aiPrompt ?? null,
        hasConditionalEdges: n.data.hasConditionalEdges ?? false,
      },
      accountId,
      mediaId,
      automationId,
    }));

    const body = JSON.stringify({ brandId, data: prismaNodes });

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });

    if (!res.ok) throw new Error("Failed to upsert nodes");

    const { data } = await res.json();
    // Reconstruct response into React Flow node format
    return data.map((n: any) => ({
      id: n.nodeId,
      type: n.type,
      position: {
        x: n.positionX,
        y: n.positionY,
      },
      measured: {
        width: n.width,
        height: n.height,
      },
      dragging: n.dragging,
      selected: n.selected,
      data: {
        label: n.data?.label,
        description: n.data?.description,
        prototypeResponse: n.data?.prototypeResponse,
        aiPrompt: n.data?.aiPrompt,
        hasConditionalEdges: n.data?.hasConditionalEdges,
      },
    }));
  },
  fetchEdges: async ({
    automationId,
  }: {
    automationId: number;
  }): Promise<IgReactFlowEdge[]> => {
    const ENDPOINT = `${API_BASE_URL}/igReactFlow/edges/${automationId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const response = await fetch(ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(
        result?.message ||
          `Failed to fetch all the edges (HTTP ${response.status})`
      );
    }

    return result.data.map((e: any) => ({
      id: e.edgeId,
      source: e.sourceId,
      target: e.targetId,
    })) as IgReactFlowEdge[];
  },

  upsertEdges: async ({
    automationId,
    brandId,
    edges,
    mediaId,
  }: {
    automationId: number;
    brandId: number;
    edges: Edge[];
    mediaId: string;
  }) => {
    const ENDPOINT = `${API_BASE_URL}/igReactFlow/edges/upsert`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const accountId = brandId;

    // Transform React Flow edges → Prisma-compatible
    const prismaEdges = edges.map((e) => ({
      edgeId: e.id,
      sourceId: e.source,
      targetId: e.target,
      accountId,
      mediaId,
      automationId,
    }));

    const body = JSON.stringify({ brandId, data: prismaEdges });

    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body,
    });

    if (!res.ok) throw new Error("Failed to upsert edges");

    const result = await res.json();

    // Normalize back to React Flow edge format
    return result.data.map((e: any) => ({
      id: e.edgeId,
      source: e.sourceId,
      target: e.targetId,
    })) as IgReactFlowEdge[];
  },
  deleteNode: async (nodeId: string) => {
    const ENDPOINT = `${API_BASE_URL}/igReactFlow/nodes/${nodeId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const res = await fetch(ENDPOINT, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete node");

    const result = await res.json();
    return result.data; // backend returns { data }
  },

  deleteEdge: async (edgeId: string) => {
    const ENDPOINT = `${API_BASE_URL}/igReactFlow/edges/${edgeId}`;
    const accessToken = storage.get(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

    const res = await fetch(ENDPOINT, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) throw new Error("Failed to delete edge");

    const result = await res.json();
    return result.data;
  },
};
