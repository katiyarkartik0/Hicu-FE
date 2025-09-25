import {
  Play,
  PlusCircle,
  Split,
  Send,
  Database,
  Brain,
  MessageCircle,
} from "lucide-react";

import Trigger from "@/components/automation/igComment/Trigger";
import End from "@/components/automation/igComment/End";
import Policy from "@/components/automation/igComment/Policy";
import Decision from "@/components/automation/igComment/Decision";
import SmartDmReplyEn from "@/components/automation/igComment/dm/SmartDmEn";
import SmartDm from "@/components/automation/igComment/dm/SmartDM";
import Dm from "@/components/automation/igComment/dm/Dm";
import SmartCommentReplyEn from "@/components/automation/igComment/comments/SmartCommentReplyEn";
import SmartCommentReply from "@/components/automation/igComment/comments/SmartCommentReply";
import CommentReply from "@/components/automation/igComment/comments/CommentReply";

export type NodeType =
  | "__start__"
  | "__end__"
  | "route"
  | "aiRouter"
  // DM
  | "dmAiVectorDb"
  | "dmAi"
  | "dmManual"
  // Comments
  | "commentReplyAiVectorDb"
  | "commentReplyAi"
  | "commentReplyManual";


const dmNodes = [
  {
    type: "dmAiVectorDb" as NodeType,
    label: "Smart DM(enhanced)",
    icons: [Brain, Database, Send],
    description: "DM intelligently using AI and vector search.",
    component: SmartDmReplyEn,
    hasConditionalEdges: false,
  },
  {
    type: "dmAi" as NodeType,
    label: "Smart DM with AI",
    icons: [Brain, Send],
    description: "DM intelligently using AI.",
    component: SmartDm,
    hasConditionalEdges: false,
  },
  {
    type: "dmManual" as NodeType,
    label: "Manual DM",
    icons: [Send],
    description: "Reply to dm manually",
    component: Dm,
    hasConditionalEdges: false,
  },
];

const commentNodes = [
  {
    type: "commentReplyAiVectorDb" as NodeType,
    label: "Smart Comment Reply(enhanced)",
    icons: [Brain, Database, MessageCircle],
    description: "Reply intelligently to comments using AI and vector search.",
    component: SmartCommentReplyEn,
    hasConditionalEdges: false,
  },
  {
    type: "commentReplyAi" as NodeType,
    label: "Smart Comment Reply",
    icons: [Brain, MessageCircle],
    description: "Reply intelligently to comments using AI.",
    component: SmartCommentReply,
    hasConditionalEdges: false,
  },
  {
    type: "commentReplyManual" as NodeType,
    label: "Comment Reply",
    icons: [MessageCircle],
    description: "Reply to comment manually",
    component: CommentReply,
    hasConditionalEdges: false,
  },
];

export const nodeDefinitions = [
  {
    type: "__start__" as NodeType,
    label: "__start__",
    icons: [Play],
    description: "Entry point of the flow (only one allowed).",
    component: Trigger,
    hasConditionalEdges: false,
  },
  {
    type: "__end__" as NodeType,
    label: "__end__",
    icons: [PlusCircle],
    description: "Exit point of the flow (multiple allowed).",
    component: End,
    hasConditionalEdges: false,
  },
  {
    type: "aiRouter" as NodeType,
    label: "Router",
    icons: [Split],
    description: "Branch logic based on conditions.",
    component: Policy,
    hasConditionalEdges: true,
  },
  {
    type: "route" as NodeType,
    label: "Route",
    icons: [],
    description: "Specific Route",
    component: Decision,
    hasConditionalEdges: true,
  },
  ...commentNodes,
  ...dmNodes,
];
