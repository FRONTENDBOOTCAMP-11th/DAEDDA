export default function MyPage() {
  return (
    <>
      <div className="flex pb-5 border-b border-gray-200 mb-8">
        <img
          src="../../../src/assets/images/smiling_daeddamon.png"
          alt="대따몬 프로필"
          className="size-16 w-fit pr-5"
        />
        <p className="font-bold flex items-center text-2xl flex-grow">User</p>
        <img src="../../../public/icons/arrow.svg" alt="프로필 수정하기" />
      </div>
      <div className="flex shadow-custom-shadow px-7 rounded-3xl pt-5 flex-col mb-8">
        <div className="flex">
          <img
            src="../../../public/icons/power.svg"
            alt="알바력"
            className="pr-8 w-fit size-9 mt-1"
          />
          <div className="flex flex-col  mb-[14px]">
            <p className="font-semibold text-xl">70%</p>
            <p className="font-semibold te xt-sm text-gray-200">알바력</p>
          </div>
        </div>

        <div>
          <img
            src="../../../public/icons/energyBar.svg"
            alt="에너지바"
            className="pb-6"
          />
        </div>
      </div>

      <div className="shadow-custom-shadow px-7 rounded-3xl mb-8 ">
        <p className="mb-3 text-2xl font-bold pt-6">나의 활동</p>
        <div>
          <div className="flex mb-4 items-center">
            <img
              src="../../../public/icons/heart.svg"
              alt="관심 목록"
              className="size-6 mr-3"
            />
            <p className="text-xl">관심 목록</p>
          </div>
          <div className="flex mb-4 ">
            <img
              src="../../../public/icons/userInfo.svg"
              alt="회원 정보"
              className="size-6 mr-3"
            />
            <p className="text-xl">회원 정보</p>
          </div>
          <div className="flex mb-4 items-center">
            <img
              src="../../../public/icons/badge.svg"
              alt="인증 뱃지"
              className="size-5 mr-4 pl-[2px]"
            />
            <p className="text-xl ">인증 뱃지</p>
          </div>
          <div className="flex mb-4">
            <img
              src="../../../public/icons/review.svg"
              alt="내가 받은 리뷰"
              className="size-6 mr-3 mt-[2px]"
            />
            <p className="text-xl pb-6">내가 받은 리뷰</p>
          </div>
        </div>
      </div>

      <div className="shadow-custom-shadow px-7 rounded-3xl">
        <p className="mb-3 text-2xl font-bold pt-6">고객 지원</p>
        <div>
          <div className="flex mb-4 items-center">
            <img
              src="../../../public/icons/customerSupport.svg"
              alt="관심 목록"
              className="size-5 mr-3"
            />
            <p className="text-xl">고객 센터</p>
          </div>
          <div className="flex mb-4 items-center">
            <img
              src="../../../public/icons/opnion.svg"
              alt="관심 목록"
              className="size-5 mr-3"
            />
            <p className="text-xl">의견 남기기</p>
          </div>
          <div className="flex mb-4 ">
            <img
              src="../../../public/icons/terms.svg"
              alt="관심 목록"
              className="size-5 mr-3 mt-[3px]"
            />
            <p className="text-xl pb-6">약관 및 정책</p>
          </div>
        </div>
      </div>
    </>
  );
}
