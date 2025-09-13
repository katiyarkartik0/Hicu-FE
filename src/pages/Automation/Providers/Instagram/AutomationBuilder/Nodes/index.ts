import {
  Play,
  PlusCircle,
  Split,
  Send,
  Database,
  Brain,
  MessageCircle,
} from "lucide-react";
import Trigger from "./components/Trigger";
import End from "./components/End";
import Decision from "./components/Decision";
import SmartCommentReplyEn from "./components/comments/SmartCommentReplyEn";
import CommentReply from "./components/comments/CommentReply";
import SmartCommentReply from "./components/comments/SmartCommentReply";
import SmartDm from "./components/dm/SmartDM";
import SmartDmReplyEn from "./components/dm/SmartDmEn";
import Dm from "./components/dm/Dm";

export type NodeType =
  | "trigger"
  | "end"
  | "decision"
  | "dm"
  | "commentReply"
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
    type: "trigger" as NodeType,
    label: "__start__",
    icons: [Play],
    description: "Entry point of the flow (only one allowed).",
    component: Trigger,
    hasConditionalEdges: false,
  },
  {
    type: "end" as NodeType,
    label: "__end__",
    icons: [PlusCircle],
    description: "Exit point of the flow (multiple allowed).",
    component: End,
    hasConditionalEdges: false,
  },
  {
    type: "decision" as NodeType,
    label: "Decision",
    icons: [Split],
    description: "Branch logic based on conditions.",
    component: Decision,
    hasConditionalEdges: true,
  },
  ...commentNodes,
  ...dmNodes,
];
