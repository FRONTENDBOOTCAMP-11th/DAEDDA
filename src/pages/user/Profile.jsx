import { useProfileData } from "@hooks/useProfileData";
import MyPageList from "@pages/myPage/MyPageList";
import { Link, useLocation } from "react-router-dom";

import { getDydamicWidth } from "@/utills/calculateStarPower";

export default function Profile() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const { reviews, isLoading, userData, partTime } = useProfileData(userId);
  if (isLoading) {
    return <div>로딩중</div>;
  }
  const dydamicWidth = getDydamicWidth(reviews, partTime);

  return (
    <div className="mb-[40px]">
      <div className="flex flex-col items-center border-b mb-8">
        <img
          src={
            userData.item?.image
              ? userData.item.image.includes("kakaocdn.net")
                ? userData.item.image
                : `https://11.fesp.shop/${userData.item.image}`
              : "/images/smiling_daeddamon.png"
          }
          alt="프로필 이미지"
          className="size-48 mb-4 mt-6 rounded-full object-cover"
        />
        <p className="font-bold text-4xl mb-6">{userData.item.name}</p>
      </div>

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
