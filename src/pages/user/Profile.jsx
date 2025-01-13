import useAxiosInstance from "@hooks/useAxiosInstance";
import MyPageList from "@pages/myPage/MyPageList";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

const starPower = {
  1: -2,
  2: -1,
  3: 1,
  4: 2,
  5: 3,
};

export default function Profile() {
  const axios = useAxiosInstance();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  // console.log(userId);
  //-----------사장일 때 받은 리뷰 api----------------

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", "Profile"],
    queryFn: () => axios.get(`/replies/seller/${userId}`),
    select: res => res.data.item,
    // staleTime: 1000 * 10,
  });
  // console.log("사장일때 데이터", data);
  //----------------알바생일때 받은 리뷰일 때 api --------------
  const { data: partTime, isLoading: partTimeLoading } = useQuery({
    queryKey: ["reviews", "partTimeProfile"],
    queryFn: () => axios.get(`users/${userId}/bookmarks`),
    select: res => res.data.item, ///byUser로 불러오면됨
  });
  // console.log(partTime);

  //-----------사용자 정보 불러오기 -------------------------------
  const { data: user, isLoading: IsUserLoading } = useQuery({
    queryKey: ["users", userId],
    queryFn: () => axios.get(`/users/${userId}`),
    select: res => res.data,
    // staleTime: 1000 * 10,
  });

  let totalPower = 0;
  if (isLoading || partTimeLoading || IsUserLoading) {
    return <div>로딩중</div>;
  }
  //------------------------------알바력 계산하기--------------
  data.forEach(item => {
    item.replies.forEach(reply => {
      const star = parseInt(reply?.rating);
      const power = starPower[star] || 0;
      totalPower += power;
    });
  });
  // console.log("사장일때 받은 리뷰", totalPower); ///====> 사장일때 받은 평균 별점 리뷰
  //1+1 = 2

  //--------------알바일때 받은 평균 별점 리뷰
  // console.log("알바생일때 받은 리뷰", partTime);
  let partTimetotalPower = 0;
  partTime.byUser.forEach(reply => {
    const partTimeStar = reply.extra?.rating || 0;
    const partTimePower = starPower[partTimeStar] || 0;
    partTimetotalPower += partTimePower;
  });
  // console.log("알바생일때 받은 리뷰", partTimetotalPower);
  //3+3+3+3 = 12
  // console.log("userId", user._id);

  let totalReview = Math.round(partTimetotalPower + totalPower) / 2;
  // console.log("총합 평점 리뷰", totalReview);
  let dydamicWidth = totalReview + 50;

  return (
    <div className="mb-[40px]">
      <div className="flex flex-col items-center border-b mb-8">
        <img
          src={
            user.item?.image
              ? user.item.image.includes("kakaocdn.net")
                ? user.item.image
                : `https://11.fesp.shop/${user.item.image}`
              : "/images/smiling_daeddamon.png"
          }
          alt="프로필 이미지"
          className="size-48 mb-4 mt-6 rounded-full"
        />
        <p className="font-bold text-4xl mb-6">{user.item.name}</p>
      </div>

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

        <div className="relative h-6 w-full">
          <img
            src="/icons/energyBar.svg"
            alt="에너지바"
            className="w-full h-full absolute object-cover rounded-3xl "
          />

          <img
            src="/icons/energyBar2.svg"
            alt="에너지률"
            className="absolute  top-0 h-full object-cover aspect-auto rounded-3xl"
            style={{ width: `${dydamicWidth}%` }}
          />
        </div>
      </div>

      <div className="myPage-container pb-4">
        <p className="mb-3 text-2xl font-bold pt-6">활동</p>
        <div>
          {/* <Link to="/review/worked">
            <MyPageList label="쓴 게시글" icon="write" />
          </Link> */}
          <Link to="/error">
            <MyPageList label="인증 뱃지" icon="badge" className="mt-[1px]" />
          </Link>
          <Link to={`/myPage/myReviews/${userId}`}>
            <MyPageList label="받은 리뷰" icon="review" />
          </Link>
        </div>
      </div>
    </div>
  );
}
