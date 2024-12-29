import { Link, useMatch } from "react-router-dom";

export default function Header() {
  const prId = useMatch("pr/:_id");
  const prIdEdit = useMatch("pr/:_id/edit");
  const prWrite = useMatch("pr/write");
  const userTerms = useMatch("user/terms");
  const signUp = useMatch("user/signUp");
  const myPageEdit = useMatch("myPage/edit");
  const myPageMyReviews = useMatch("myPage/myReviews");
  const reviewWrite = useMatch("review/write");
  const mainWrite = useMatch("main/write");
  const mainID = useMatch("main/:_id");
  const mainIDEdit = useMatch("main/:_id/edit");

  // 현재 url과 useMatch("pr/write")(=>prWrite) 와 일치한다면 pathname~,,등등 반환 불일치시 null 반환
  // titles 배열에 일치할 때 title을 미리 정의해두었다가 getTitle을 통해 title 반환

  const titles = [
    { match: prWrite, title: "공고 지원 글 작성" },
    { match: prId, title: "공고 지원 상세" },
    { match: prIdEdit, title: "공고 지원 수정" },
    { match: userTerms, title: "약관 동의" },
    { match: signUp, title: "회원 정보 입력" },
    { match: myPageEdit, title: "회원 정보 수정" },
    { match: myPageMyReviews, title: "내가 받은 리뷰" },
    { match: mainWrite, title: "글쓰기" },
    { match: mainID, title: "공고 상세 페이지" },
    { match: mainIDEdit, title: "공고 상세 수정" },
    { match: reviewWrite, title: "리뷰 작성" },
  ];

  const getTitle = () => {
    // match가 null이 아닌 것의 title을 반환, null이면 undefined
    const matchedTitle = titles.find(({ match }) => match)?.title;
    return matchedTitle;
  };

  const headerMatch =
    prId ||
    prIdEdit ||
    prWrite ||
    userTerms ||
    signUp ||
    myPageEdit ||
    myPageMyReviews ||
    reviewWrite ||
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
        <div className="w-full text-center text-[24px] font-bold">
          {getTitle()}
        </div>
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
