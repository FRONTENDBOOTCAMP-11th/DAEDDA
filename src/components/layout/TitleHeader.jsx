export default function TitleHeader() {
  return (
    <header className="relative w-full h-[60px] flex items-center justify-center border-b border-gray-200 mb-5">
      <img
        src="/icons/back.svg"
        className="absolute left-0 w-6 h-6 hover:cursor-pointer"
      />
      <div className="w-full text-center text-[24px] font-bold">제목</div>
    </header>
  );
}
