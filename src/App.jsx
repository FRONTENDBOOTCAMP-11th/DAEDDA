import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "../routes";

function App() {
  return (
    <div className="px-6 max-w-screen-sm m-auto h-screen overflow-y-auto relative">
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </div>
  );
}

export default App;
