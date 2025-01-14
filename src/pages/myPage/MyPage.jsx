import useAxiosInstance from "@hooks/useAxiosInstance";
import { useProfileData } from "@hooks/useProfileData";
import MyPageList from "@pages/myPage/MyPageList";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { Link, useNavigate } from "react-router-dom";
import {
  calculatePartTimePower,
  calculateTotalPower,
} from "@/utills/calculateStarPower";

export default function MyPage() {
  const { user, resetUser } = useUserStore();
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  const logoutFun = () => {
    alert("로그아웃 되었습니다.");
    resetUser();
    navigate("/user/signIn");
  };

  // user가 null이면 로그인 페이지로 이동

  //-----------사장일 때 받은 리뷰 api----------------

  // const { data, isLoading } = useQuery({
  //   queryKey: ["reviews", "myPage"],
  //   queryFn: () => axios.get(`/replies/seller/${user._id}`),
  //   select: res => res.data.item,
  //   // staleTime: 1000 * 10,
  // });
  // console.log("사장일때 데이터", data);
  //----------------알바생일때 받은 리뷰일 때 api --------------
  // const { data: partTime, isLoading: partTimeLoading } = useQuery({
  //   queryKey: ["reviews", "partTimeMyPage"],
  //   queryFn: () => axios.get(`users/${user._id}/bookmarks`),
  //   select: res => res.data.item, ///byUser로 불러오면됨
  // });
  // console.log(partTime);
  //
  const { reviews, isLoading, partTime } = useProfileData(user._id);
  // let totalPower = 0;
  if (isLoading) {
    return <div>로딩중</div>;
  }
  // let totalPower = 0;
  // // if (isLoading || partTimeLoading) {
  // //   return <div>로딩중</div>;
  // // }
  if (!user) {
    navigate("/user/signIn");
    return null;
  }
  //------------------------------알바력 계산하기--------------
  // data.forEach(item => {
  //   item.replies?.forEach(reply => {
  //     const star = parseInt(reply.rating);
  //     const power = starPower[star] || 0;
  //     totalPower += power;
  //   });
  // });
  // console.log("사장일때 받은 리뷰", totalPower); ///====> 사장일때 받은 평균 별점 리뷰
  //1+1 = 2

  //--------------알바일때 받은 평균 별점 리뷰
  // console.log("알바생일때 받은 리뷰", partTime);
  const totalPower = calculateTotalPower(reviews || []);
  console.log(totalPower, "토탈파워");
  const partTimePower = calculatePartTimePower(partTime || []);
  console.log(partTimePower, "알바생");
  //소수점 첫째자리 반올림
  const totalReview = Math.round(((totalPower + partTimePower) / 2) * 10) / 10;
  console.log(totalReview, "총점리뷰 평균");
  const dydamicWidth = totalReview + 50;
  console.log(dydamicWidth);
  // console.log(dydamicWidth);
  return (
    <>
      <div className="mb-[80px]">
        <Link to={`/user/${user._id}`}>
          <div className="flex pb-5 border-b border-gray-200 mb-8">
            <img
              src={
                user?.image
                  ? user.image.includes("kakaocdn.net")
                    ? user.image
                    : `https://11.fesp.shop/${user.image}`
                  : "/images/smiling_daeddamon.png"
              }
              alt="대따몬 프로필"
              className="size-16 w-fit mr-5 rounded-full"
            />
            <p className="font-bold flex items-center text-2xl flex-grow">
              {user.name}
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
              <p className="font-semibold text-xl">{totalReview + 50}%</p>
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

            {/* <Link to="/review/worked">
              <MyPageList label="쓴 게시글" icon="write" />
            </Link> */}
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
