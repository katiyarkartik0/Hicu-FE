import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex justify-center items-center"
    >
      <Loader2 className="animate-spin text-gray-600" size={24} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
