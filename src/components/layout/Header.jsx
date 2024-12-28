import { Link, useMatch } from "react-router-dom";

export default function Header() {
  const prId = useMatch("pr/:_id");
  const prIdEdit = useMatch("pr/:_id/edit");
  const prWrite = useMatch("pr/write");
  const userTerms = useMatch("user/terms");
  const myPageEdit = useMatch("myPage/edit");
  const myPageMyReviews = useMatch("myPage/myReviews");
  const myPlace = useMatch("myPlace");
  const myPerson = useMatch("myPerson");
  const mainWrite = useMatch("main/write");
  const mainID = useMatch("main/:_id");
  const mainIDEdit = useMatch("main/:_id/edit");

  const headerMatch =
    prId ||
    prIdEdit ||
    prWrite ||
    userTerms ||
    myPageEdit ||
    myPageMyReviews ||
    myPlace ||
    myPerson ||
    mainWrite ||
    mainID ||
    mainIDEdit;

  if (headerMatch) {
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

  return (
    <header className="w-full h-[60px] flex items-center justify-between fixed top-0 max-w-screen-sm left-1/2 -translate-x-1/2 bg-white px-6">
      <Link to="/">
        <img
          src="/src/assets/logos/header-logo.png"
          className="w-[190px] cursor-pointer"
        />
      </Link>
      <div className="flex items-center gap-4">
        <img src="/icons/alarm.svg" className="cursor-pointer" />
        <img src="/icons/hamburger.svg" className="w-6 cursor-pointer" />
      </div>
    </header>
  );
}
