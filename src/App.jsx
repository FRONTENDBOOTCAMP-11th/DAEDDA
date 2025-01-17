import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "../routes";
import { useEffect, useState } from "react";

function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // 최초만 실행하기 위해 isShown을 sessionStorage에 저장
    const isShown = sessionStorage.getItem("isShown");

    // null 일 때 실행 됨
    if (!isShown) {
      // splash 보여주기
      setShowSplash(true);

      const timer = setTimeout(() => {
        // 2초 뒤에 화면 꺼짐
        setShowSplash(false);

        sessionStorage.setItem("isShown", "true");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div
      className={`px-6 max-w-screen-sm m-auto h-screen relative overflow-y-auto`}
    >
      {showSplash ? (
        <SplashScreen />
      ) : (
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      )}
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
