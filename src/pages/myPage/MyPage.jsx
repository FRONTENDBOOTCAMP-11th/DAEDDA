import MyPageList from "@pages/myPage/MyPageList";

export default function MyPage() {
  return (
    <>
      <div className="flex pb-5 border-b border-gray-200 mb-8">
        <img
          src="/src/assets/images/smiling_daeddamon.png"
          alt="대따몬 프로필"
          className="size-16 w-fit pr-5"
        />
        <p className="font-bold flex items-center text-2xl flex-grow">User</p>
        <img src="/icons/arrow.svg" alt="프로필 수정하기" />
      </div>
      <div className="myPage-container pt-5 flex-col flex pb-6">
        <div className="flex gap-6">
          <img
            src="/icons/power.svg"
            alt="알바력"
            className="w-fit size-9 mt-1"
          />
          <div className="flex flex-col  mb-[14px]">
            <p className="font-semibold text-xl">70%</p>
            <p className="font-semibold text-sm text-gray-200">알바력</p>
          </div>
        </div>

        <div className="relative h-8 ">
          <img
            src="/icons/energyBar.svg"
            alt="에너지바"
            className="w-full h-full absolute"
          />
          <img
            src="/icons/energyBar2.svg"
            alt="에너지률"
            className=" w-[70%] absolute left-4 top-0 h-full object-contain aspect-auto rounded-3xl"
          />
        </div>
      </div>

      <div className="myPage-container pb-4">
        <p className="mb-3 text-2xl font-bold pt-6">나의 활동</p>
        <div>
          <MyPageList label="관심 목록" icon="heart" />
          <MyPageList label="회원 정보" icon="userInfo" />
          <MyPageList label="인증 뱃지" icon="badge" />
          <MyPageList label="내가 받은 리뷰" icon="review" />
        </div>
      </div>

      <div className="myPage-container pb-4">
        <p className="mb-3 text-2xl font-bold pt-6">고객 지원</p>
        <div>
          <MyPageList label="고객 센터" icon="customerSupport" />
          <MyPageList label="의견 남기기" icon="opnion" />
          <MyPageList label="약관 및 정책" icon="terms" />
        </div>
      </div>
    </>
  );
}
