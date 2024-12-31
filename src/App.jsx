import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "../routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const [showSplash, setShowSplash] = useState(false);
  useEffect(() => {
    //스플래쉬 화면이 실행 되었는지 sessionStorage에 저장한다.
    const isShown = sessionStorage.getItem("isShown");

    if (!isShown) {
      setShowSplash(true);
      sessionStorage.setItem("showSplash", "true");

      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  });

  return (
    <QueryClientProvider client={QueryClient}>
      <div className="px-6 max-w-screen-sm m-auto h-screen overflow-y-auto relative">
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function SplashScreen() {
  return <div>스플래쉬</div>;
}

export default App;
