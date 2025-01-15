import useUserStore from "@zustand/userStore";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const { user } = useUserStore();

  return (
    <div className="absolute top-0 right-0 w-1/2 h-screen bg-gray-100 z-10">
      <div className="m-6">
        <div className="flex justify-end">
          <img
            src="/icons/x.svg"
            className="cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>

        {!user?._id ? (
          <>
            <div className="flex mt-10 justify-between border-b-2 pb-4">
              <h1 className="text-[1.5rem]">
                <b>로그인</b> 하세요
              </h1>
              <img src="/icons/arrow.svg" className="" />
            </div>
            <h1 className="mt-4 text-[1rem] text-[#605D5D]">
              고객센터에 문의하기
            </h1>
          </>
        ) : (
          <>
            <div className="mt-10 border-b-2 pb-4">
              <h1 className="text-[1.5rem] mb-4">
                <b>유저이름</b> 님
              </h1>
              <h1 className="text-[1.25rem]">유저 이메일</h1>
            </div>
            <h1 className="mt-4 text-[1rem] text-[#605D5D]">
              고객센터에 문의하기
            </h1>
            <h1 className="mt-4 text-[1rem] text-[#605D5D]">환불 규정</h1>
          </>
        )}
      </div>
    </div>
  );
}
