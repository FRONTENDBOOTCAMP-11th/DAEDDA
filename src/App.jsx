import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "../routes";
import { useEffect } from "react";
import useSplashStore from "@zustand/splashStore";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isSplashShown, hasShownSplash, showSplash } = useSplashStore();

  useEffect(() => {
    // 스플래시 화면이 한 번도 표시되지 않은 경우에만 실행
    if (!hasShownSplash) {
      showSplash(); // 스플래시 화면 표시 및 상태 변경
    }
  }, [hasShownSplash, showSplash]);
  return (
    <div className="min-h-screen overflow-y-auto">
      {/* <div className="px-6 max-w-screen-sm m-auto h-screen relative overflow-y-auto"> */}
      <div className="px-6 max-w-screen-sm m-auto relative">
        {isSplashShown ? (
          <SplashScreen />
        ) : (
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
          />
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        toastClassName={() =>
          "flex items-center justify-between p-4 px-8 rounded-lg bg-white text-black shadow-md"
        }
        bodyClassName={() => "text-sm"}
        progressClassName={"bg-red-500"}
        hideProgressBar={true}
        transition={Slide}
      />
    </div>
  );
}

function SplashScreen() {
  return (
    <div className="-mx-6 max-w-screen-sm m-auto h-screen overflow-y-auto relative flex items-center justify-center bg-[#F3E5FF] animate-fade-out">
      <img src="/logos/logo_title.png" className="px-6"></img>
    </div>
  );
}

export default App;
