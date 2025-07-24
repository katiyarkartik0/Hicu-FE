import type { MediaItem } from "@/type/interfaces/instagram";
import { Webhook } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Post = ({
  post,
  isAutomationRunning,
}: {
  post: MediaItem;
  isAutomationRunning: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <div
      key={post.id}
      className="aspect-square overflow-hidden relative cursor-pointer"
      onClick={() => navigate(`create/${post.id}`)}
    >
      {isAutomationRunning && (
        <div className="absolute top-2 right-2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-md">
          <Webhook className="animate-spin text-blue-600 w-5 h-5" />
        </div>
      )}
      <img
        src={post.mediaUrl}
        alt={post.caption ?? "Instagram post"}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
      />
    </div>
  );
};

export default Post;
