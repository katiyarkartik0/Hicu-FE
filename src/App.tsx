import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import Loader from "@/components/ui/Loader";

const router = createBrowserRouter(routes);

function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
