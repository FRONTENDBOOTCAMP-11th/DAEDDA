import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "@zustand/userStore";
import { useProfileData } from "@hooks/useProfileData";
import MyPageList from "@pages/myPage/MyPageList";
import { getDydamicWidth } from "@/utills/calculateStarPower";

export default function MyPage() {
  const { user, resetUser } = useUserStore();
  const navigate = useNavigate();
  const isRedirected = useRef(false); // 중복 실행 방지
  // ref사용-> 렌더링과 상관없이 값 유지,

  useEffect(() => {
    if (!user && !isRedirected.current) {
      isRedirected.current = true; //true일때 alert실행X, false일때 alert와 nav실행
      //alert중복 방지
      alert("로그인이 필요한 페이지입니다.");
      navigate("/user/signIn");
    }
  }, [user, navigate]);

  // user가 없으면 useProfileData 실행하지 않음
  const { userData, reviews, isLoading, partTime } = useProfileData(user?._id);

  // 로딩 상태 표시
  if (!user || isLoading) {
    return <div>로딩중</div>;
  }

  const logoutFun = () => {
    // console.log(isRedirected.current); //=>false
    alert("로그아웃 되었습니다.");
    resetUser();
    isRedirected.current = true;
    navigate("/user/signIn");
  };

  const dydamicWidth = getDydamicWidth(reviews, partTime);

  return (
    <>
      <div className="mb-[80px]">
        <Link to={`/user/${user._id}`}>
          <div className="flex pb-5 border-b border-gray-200 mb-8">
            <img
              src={
                userData?.item?.image
                  ? userData?.item.image.includes("kakaocdn.net")
                    ? userData?.item.image
                    : `https://11.fesp.shop/${userData?.item.image}`
                  : "/images/smiling_daeddamon.png"
              }
              alt="대따몬 프로필"
              className="size-16 object-cover mr-5 rounded-full"
            />
            <p className="font-bold flex items-center text-2xl flex-grow">
              {userData?.item.name}
            </p>
            <img src="/icons/arrow.svg" alt="프로필 수정하기" />
          </div>
        </Link>
        <div className="myPage-container pt-5 flex-col flex pb-6">
          <div className="flex gap-6">
            <img
              src="/icons/power.svg"
              alt="알바력"
              className="w-fit size-9 mt-1"
            />
            <div className="flex flex-col  mb-[14px]">
              <p className="font-semibold text-xl">{dydamicWidth}%</p>
              <p className="font-semibold text-sm text-beige-500 tracking-wide">
                대타력
              </p>
            </div>
          </div>

          <div className="relative h-6 w-full -z-10">
            <img
              src="/icons/energyBar.svg"
              alt="에너지바"
              className="w-full h-full absolute object-cover rounded-3xl "
            />

            <img
              src="/icons/energyBar2.svg"
              alt="에너지률"
              className={` absolute  top-0 h-full object-cover aspect-auto rounded-3xl`}
              style={{ width: `${dydamicWidth}%` }}
            />
          </div>
        </div>

        <div className="myPage-container pb-4">
          <p className="mb-3 text-2xl font-bold pt-6">나의 활동</p>
          <div>
            <Link to={`/myPage/likeList`}>
              <MyPageList label="관심 목록" icon="heart" className="mt-[2px]" />
            </Link>
          </div>
        </div>

        <div className="myPage-container pb-4">
          <p className="mb-3 text-2xl font-bold pt-6">고객 지원</p>
          <div>
            <Link to="/error">
              <MyPageList label="고객 센터" icon="customerSupport" />
            </Link>
            <Link to="/error">
              <MyPageList label="의견 남기기" icon="opnion" />
            </Link>
            <Link to="/error">
              <MyPageList label="약관 및 정책" icon="terms" className="" />
            </Link>
          </div>
        </div>

        <div className="myPage-container pb-4">
          <p className="mb-3 text-2xl font-bold pt-6">계정관리</p>
          <div>
            <Link to={`/myPage/edit`}>
              <MyPageList
                label="회원 정보 수정"
                icon="userInfo"
                className="mb-[2px]"
              />
            </Link>
            <div onClick={logoutFun} className="cursor-pointer">
              <MyPageList label="로그 아웃" icon="logout" />
            </div>
            <Link to="/error">
              <MyPageList label="회원 탈퇴" icon="withdraw" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
