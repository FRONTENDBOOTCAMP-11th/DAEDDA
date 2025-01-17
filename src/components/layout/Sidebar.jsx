import useUserStore from "@zustand/userStore";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ closeSidebar }) {
  const { user } = useUserStore();
  const navigate = useNavigate();

  const handleClose = () => {
    closeSidebar();
  };

  // 로그인으로 이동
  const goToSignIn = () => {
    closeSidebar();
    navigate("/user/signIn");
  };

  // 404로 이동
  const goToError = () => {
    closeSidebar();
    navigate("/error");
  };

  return (
    <div className="flex fixed inset-0 max-w-screen-sm m-auto z-10">
      <div
        className="bg-black w-1/3 h-screen bg-opacity-50 z-10 "
        onClick={handleClose}
      ></div>
      <div className="w-2/3 h-screen bg-[#F8F1FF] z-10">
        <div className="m-6">
          <div className="flex justify-end">
            <img
              src="/icons/x.svg"
              className="cursor-pointer"
              onClick={handleClose}
            />
          </div>

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
                onClick={goToError}
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