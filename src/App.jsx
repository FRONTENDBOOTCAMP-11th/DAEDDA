import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "../routes";
import { useEffect, useState } from "react";

function App() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    // 최초만 실행하기 위해 isShown을 sessionStorage에 저장
    const isShown = sessionStorage.getItem("isShown");

    console.log("초기 isShown 값: ", isShown); // null

    // null 일 때 실행 됨
    if (!isShown) {
      console.log("isShwon이 null이므로 Splash 화면 보여주기");

      // splash 보여주기
      setShowSplash(true);

      // 실행 되었으니 true로 값 변경
      sessionStorage.setItem("isShown", "true");
      console.log("세션 isShown의 값 ", sessionStorage.getItem("isShown"));

      const timer = setTimeout(() => {
        // 2초 뒤에 화면 꺼짐
        setShowSplash(false);
        console.log("화면 꺼짐");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      console.log("해당사항 없음");
    }
  }, []);

  return (
    <div className="px-6 max-w-screen-sm m-auto h-screen overflow-y-auto relative">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      )}
    </div>
  );
}

function SplashScreen() {
  return <div>스플래쉬 화면</div>;
}

export default App;
