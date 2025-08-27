import { useNumericParam } from "@/hooks/react-router";
import { instagramService } from "@/services/instagram";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Prospect = () => {
  const { id: userId } = useParams();
  const brandId = useNumericParam("brandId");

  if (!userId || !brandId) {
    return null;
  }
console.log(userId,brandId)
  const threads = useQuery({
    queryFn: () => instagramService.getThreads({ brandId, userId }),
    queryKey: ["threads", brandId, userId],
  });
console.log(threads.data)
  if (threads.isLoading) return <div className="p-4">Loading threads...</div>;
  if (threads.error) return <div className="p-4 text-red-500">Error loading threads</div>;
  if (!threads.data || threads.data.length === 0) {
    return <div className="p-4 text-gray-500">No threads found</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Threads for {userId}</h1>
      <div className="space-y-6">
        {threads.data.map((thread: any) => (
          <Thread key={thread.id} thread={thread} />
        ))}
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
