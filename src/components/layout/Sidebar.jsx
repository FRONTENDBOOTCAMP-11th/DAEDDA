export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className="absolute top-0 right-0 w-1/2 h-screen bg-gray-100 z-10">
      <div className="mt-6 ml-6">
        <img
          src="/icons/x.svg"
          className="cursor-pointer"
          onClick={toggleSidebar}
        />
        <div className="flex mt-10 justify-between ">
          <h1>로그인 하세요</h1>
          <img src="/icons/arrow.svg" />
        </div>
      </div>
    </div>
  );
}
