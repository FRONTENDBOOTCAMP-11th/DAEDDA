import useSidebarStore from "@zustand/sidebarStore";
import useUserStore from "@zustand/userStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { isSidebarOpen, setSidebarOpen } = useSidebarStore();
  const [animate, setAnimate] = useState(""); // 애니메이션 제어

  const handleClose = () => {
    setAnimate("animate-slide-out"); // 닫을때 애니메이션 추가
    setTimeout(() => {
      // 상태 변화에 딜레이를 줌 (애니메이션이 동작하도록)
      setSidebarOpen(false);
    }, 700);
  };

  // 로그인으로 이동
  const goToSignIn = () => {
    handleClose();
    navigate("/user/signIn");
  };

  // 404로 이동
  const goToError = () => {
    setSidebarOpen(false);
    navigate("/error");
  };
  //환불규정으로 이동
  const goToRefund = () => {
    setSidebarOpen(false);
    navigate("/refund");
  };

  useEffect(() => {
    if (isSidebarOpen) {
      setAnimate("animate-slide-in");
    } else {
      setAnimate("");
    }
  }, [isSidebarOpen]);

  return (
    <div className="flex fixed inset-0 max-w-screen-sm m-auto z-10 overflow-hidden">
      <div
        className="absolute bg-black w-full h-screen bg-opacity-50 z-10 "
        onClick={handleClose}
      ></div>
      <div
        className={`absolute top-0 right-0 w-2/3 h-screen bg-[#F8F1FF] z-10 ${animate}`}
      >
        <div className="m-6">
          <div className="flex justify-end">
            <img
              src="/icons/x.svg"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>

          {/* 로그인 된 상태일 때 */}
          {!user?._id ? (
            <>
              <div
                className="flex mt-10 justify-between border-b-2 pb-4 cursor-pointer"
                onClick={goToSignIn}
              >
                <h1 className="text-[1.5rem]">
                  <b>로그인</b> 하세요
                </h1>
                <img src="/icons/arrow.svg" className="" />
              </div>
              <h1
                className="mt-4 text-[1rem] text-[#605D5D] cursor-pointer"
                onClick={goToError}
              >
                고객센터에 문의하기
              </h1>
            </>
          ) : (
            <>
              <div className="mt-10 border-b-2 pb-4">
                <h1 className="text-[1.25rem] mb-4 text-gray-500 font-semibold">
                  환영합니다!
                </h1>
                <h1 className="text-[1.5rem]">
                  <b>{user.name}</b> 님
                </h1>
              </div>
              <h1
                className="mt-4 text-[1rem] text-[#605D5D] cursor-pointer"
                onClick={goToError}
              >
                고객센터에 문의하기
              </h1>
              <h1
                className="mt-4 text-[1rem] text-[#605D5D] cursor-pointer"
                onClick={goToRefund}
              >
                환불 규정
              </h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
