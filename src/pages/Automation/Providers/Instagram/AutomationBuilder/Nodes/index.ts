import {
  Play,
  PlusCircle,
  Split,
  Send,
  Database,
  Brain,
  Heart,
  Code2,
} from "lucide-react";
import Trigger from "./components/Trigger";
import End from "./components/End";
import Decision from "./components/Decision";
import Dm from "./components/Dm";
import SmartCommentReplyEn from "./components/SmartCommentReplyEn";
import CommentReply from "./components/CommentReply";
import SmartCommentReply from "./components/SmartCommentReply";

export type NodeType =
  | "trigger"
  | "end"
  | "decision"
  | "dm"
  | "commentReply"
  | "commentReplyAiVectorDb"
  | "commentReplyAi"
  | "commentReplyManual";

export const nodeDefinitions = [
  {
    type: "trigger" as NodeType,
    label: "__start__",
    icons: [Play],
    description: "Entry point of the flow (only one allowed).",
    component: Trigger,
  },
  {
    type: "end" as NodeType,
    label: "__end__",
    icons: [PlusCircle],
    description: "Exit point of the flow (multiple allowed).",
    component: End,
  },
  {
    type: "decision" as NodeType,
    label: "Decision",
    icons: [Split],
    description: "Branch logic based on conditions.",
    component: Decision,
  },
  {
    type: "dm" as NodeType,
    label: "Send DM",
    icons: [Send],
    description: "Send a direct message automatically.",
    component: Dm,
  },
  {
    type: "commentReplyAiVectorDb" as NodeType,
    label: "Smart Comment Reply(enhanced)",
    icons: [Brain, Database],
    description: "Reply intelligently to comments using AI and vector search.",
    component: SmartCommentReplyEn,
  },
  {
    type: "commentReplyAi" as NodeType,
    label: "Smart Comment Reply",
    icons: [Brain],
    description: "Reply intelligently to comments using AI.",
    component: SmartCommentReply,
  },
  {
    type: "commentReplyManual" as NodeType,
    label: "Comment Reply",
    icons: [Code2],
    description: "Reply to comment manually",
    component: CommentReply,
  }
];
