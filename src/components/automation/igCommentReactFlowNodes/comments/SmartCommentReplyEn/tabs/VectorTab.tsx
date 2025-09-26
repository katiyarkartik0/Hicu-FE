// -------------------------------
// Vector DB Tab
// -------------------------------
const VectorTab: React.FC = () => (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">
        Vector Search & Sync
      </h2>
      <p className="text-sm text-gray-600">
        Vector search enhances the AI’s ability to understand user queries by
        searching semantically in a vector database rather than using simple
        keywords. Syncing ensures the client data and vector DB stay consistent
        for better responses.
      </p>
      <button
        onClick={() => console.log("Sync Vector DB triggered!")}
        className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition self-end"
      >
        Sync Vector DB
      </button>
    </div>
  );

export default VectorTab;