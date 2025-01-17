import { Link, useMatch, useNavigate } from "react-router-dom";
import useUserStore from "@zustand/userStore";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useEffect } from "react";
import useAlarmExistStore from "@zustand/alarmExistStore";
import useSidebarStore from "@zustand/sidebarStore";

export default function Header() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const error = useMatch("/error");
  const prWrite = useMatch("pr/write");
  const userTerms = useMatch("user/terms");
  const signUp = useMatch("user/signUp");
  const myPageEdit = useMatch("myPage/edit");
  const myPageMyReviews = useMatch("myPage/myReviews/:_id");
  const reviewWrite = useMatch("review/write");
  const PostWrite = useMatch("post/write");
  const mainID = useMatch("post/:_id");
  const mainIDEdit = useMatch("post/:_id/edit");
  const userProfile = useMatch("user/:_id");
  const likeList = useMatch("myPage/likeList");
  const alarm = useMatch("/alarm");

  // 현재 url과 useMatch("pr/write")(=>prWrite) 와 일치한다면 pathname~,,등등 반환 불일치시 null 반환
  // titles 배열에 일치할 때 title을 미리 정의해두었다가 getTitle을 통해 title 반환
  const { setSidebarOpen } = useSidebarStore(); // 사이드바 상태

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const { alarmExist, setAlarmExist } = useAlarmExistStore();
  const axios = useAxiosInstance();

  const checkAlarmExist = async () => {
    const res = await axios.get(`/notifications`);
    if (res.data.item.length > 0) {
      setAlarmExist(true);
    }
  };

  useEffect(() => {
    if (user) {
      checkAlarmExist();
    }
  }, [user]);

  const titles = [
    { match: prWrite, title: "공고 지원 글 작성" },
    { match: userTerms, title: "약관 동의" },
    { match: signUp, title: "회원 정보 입력" },
    {
      match: myPageEdit,
      title: user?.isNew ? "회원 정보 입력" : "회원 정보 수정",
    },
    { match: myPageMyReviews, title: "내가 받은 리뷰" },
    { match: PostWrite, title: "글쓰기" },
    { match: mainID, title: "공고 상세 페이지" },
    { match: mainIDEdit, title: "공고 상세 수정" },
    { match: reviewWrite, title: "리뷰 작성" },
    { match: userProfile, title: "프로필" },
    { match: likeList, title: "관심 목록" },
    { match: alarm, title: "알람" },
  ];

  const handleAlarm = () => {
    navigate("/alarm");
  };

  const getTitle = () => {
    // match가 null이 아닌 것의 title을 반환, null이면 undefined
    const matchedTitle = titles.find(({ match }) => match)?.title;
    return matchedTitle;
  };

  const headerMatch =
    prWrite ||
    userTerms ||
    signUp ||
    myPageEdit ||
    myPageMyReviews ||
    reviewWrite ||
    PostWrite ||
    mainID ||
    mainIDEdit ||
    userProfile ||
    likeList ||
    alarm;
  if (error) {
    return null;
  }

  if (headerMatch) {
    return (
      <header className="w-full h-[60px] flex items-center justify-center border-b border-gray-200 mb-5 fixed top-0 max-w-screen-sm left-1/2 -translate-x-1/2 bg-white px-6 z-10">
        <img
          src="/icons/back.svg"
          className="absolute left-[16px] w-6 h-6 hover:cursor-pointer "
          onClick={() => navigate(-1)}
        />
        <div className="w-full text-center text-[24px] font-bold">
          {getTitle()}
        </div>
      </header>
    );
  }

  return (
    <header className="w-full h-[60px] flex items-center justify-between fixed top-0 max-w-screen-sm left-1/2 -translate-x-1/2 bg-white px-6 z-10">
      <Link to="/">
        <img
          src="/logos/header-logo.png"
          className="w-[170px] cursor-pointer"
        />
      </Link>
      <div className="flex items-center gap-4">
        {alarmExist ? (
          <img
            src="/icons/redAlarm.svg"
            className="cursor-pointer"
            onClick={handleAlarm}
          />
        ) : (
          <img
            src="/icons/alarm.svg"
            className="cursor-pointer"
            onClick={handleAlarm}
          />
        )}

        <img
          src="/icons/hamburger.svg"
          className="w-6 cursor-pointer"
          onClick={openSidebar}
        />
      </div>
    </header>
  );
}
