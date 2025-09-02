import { DetailCard } from "@/components/analytics/prospect/DetailCard";
import { useNumericParam } from "@/hooks/react-router";
import { instagramService } from "@/services/instagram";
import { prospectsService } from "@/services/prospects";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Prospect = () => {
  const { id: userId } = useParams();
  const brandId = useNumericParam("brandId");

  if (!userId || !brandId) {
    return null;
  }
  const prospect = useQuery({
    queryKey: ["prospect", brandId] as const,
    enabled: !!brandId,
    queryFn: ({ queryKey }) => {
      const [, brandId] = queryKey;
      return prospectsService.fetchProspect({ brandId, userId });
    },
  });
  const threads = useQuery({
    queryFn: () => instagramService.getThreads({ brandId, userId }),
    queryKey: ["threads", brandId, userId],
  });
  const savedConversation = useQuery({
    queryFn: () => instagramService.getSavedConversation({ brandId, userId }),
    queryKey: ["savedConversation", brandId, userId],
  });

  if (prospect.isPending || !prospect.data)
    return <div className="p-4">Loading prospect...</div>;
  if (threads.isLoading) return <div className="p-4">Loading threads...</div>;
  if (threads.error)
    return <div className="p-4 text-red-500">Error loading threads</div>;
  if (!threads.data || threads.data.length === 0) {
    return <div className="p-4 text-gray-500">No threads found</div>;
  }

  return (
    <div className="p-4">
      <div className="flex gap-6">
        {/* Left column: Avatar + Prospect Card */}
        <div className="w-64 space-y-4">
          {/* Mock Avatar */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500 to-yellow-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {prospect.data.username?.[0]?.toUpperCase() || "?"}
            </div>
            <p className="mt-2 text-sm font-semibold text-gray-800">
              {prospect.data.username || "Unknown"}
            </p>
          </div>
          <DetailCard prospect={prospect.data} />
        </div>

        {/* Middle column: Threads */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[75vh] pr-4">
          {threads.data.map((thread: any) => (
            <Thread key={thread.id} thread={thread} />
          ))}
        </div>

        {/* Right column: DM Window */}
        <div className="w-80 flex flex-col border rounded-xl shadow-sm">
          <div className="p-3 border-b font-semibold bg-gray-50">
            Direct Message
          </div>

          {/* Conversation messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3 max-h-[60vh]">
            {savedConversation.isLoading && (
              <p className="text-gray-400 text-center mt-10">
                Loading conversation...
              </p>
            )}
            {savedConversation.error && (
              <p className="text-red-500 text-center mt-10">
                Error loading conversation
              </p>
            )}
            {!savedConversation.isLoading &&
            savedConversation.data &&
            savedConversation.data.length > 0 ? (
              savedConversation.data.map((msg: any) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isProspect={msg.senderId === userId}
                />
              ))
            ) : (
              <p className="text-gray-400 text-center mt-10">
                No messages yet. Start a conversation!
              </p>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button className="px-3 py-2 bg-indigo-500 text-white rounded-full text-sm hover:bg-indigo-600">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prospect;

// --- Subcomponents ---
type CommentProps = {
  comment: any;
  isReply?: boolean;
};

const Comment = ({ comment, isReply = false }: CommentProps) => {
  return (
    <div
      className={`p-3 rounded-2xl shadow-sm border ${
        isReply ? "ml-10 bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-sm">{comment.username}</span>
        <span className="text-xs text-gray-400">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <p className="text-gray-800">{comment.text}</p>
    </div>
  );
};

const Thread = ({ thread }: { thread: any }) => {
  return (
    <div className="border-l-4 border-indigo-500 pl-4 space-y-3">
      <Comment comment={thread} />
      {thread.replies?.length > 0 && (
        <div className="space-y-2">
          {thread.replies.map((reply: any) => (
            <Comment key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
};

type MessageBubbleProps = {
  message: any;
  isProspect: boolean;
};

const MessageBubble = ({ message, isProspect }: MessageBubbleProps) => {
  return (
    <div className={`flex ${isProspect ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[70%] px-3 py-2 rounded-2xl text-sm shadow break-words
          ${
            isProspect
              ? "bg-gray-200 text-gray-800"
              : "bg-indigo-500 text-white"
          }
        `}
      >
        <p>{message.messageText}</p>
        <span className="block text-[10px] mt-1 opacity-70">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
};
