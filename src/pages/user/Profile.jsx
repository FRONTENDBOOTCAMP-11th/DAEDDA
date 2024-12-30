import MyPageList from "@pages/myPage/MyPageList";

export default function Profile() {
  return (
    <div className="mb-[40px]">
      <div className="flex flex-col items-center border-b mb-8">
        <img
          src="/src/assets/images/smiling_daeddamon.png"
          alt="프로필 이미지"
          className="size-48 mb-4 mt-6"
        />
        <p className="font-bold text-4xl mb-6">user</p>
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
            <p className="font-semibold text-sm text-beige-500 tracking-wide">
              알바력
            </p>
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
        <p className="mb-3 text-2xl font-bold pt-6">활동</p>
        <div>
          <MyPageList label="쓴 게시글" icon="write" />
          <MyPageList label="인증 뱃지" icon="badge" className="mt-[1px]" />
          <MyPageList label="받은 리뷰" icon="review" />
        </div>
      </div>
    </div>
  );
}
