import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "../routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <QueryClientProvider client={QueryClient}>
      <div className="px-6 max-w-screen-sm m-auto h-screen overflow-y-auto relative">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
