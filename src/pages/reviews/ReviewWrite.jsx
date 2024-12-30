import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";

export default function ReviewWrite() {
  return (
    <div className="mb-[40px]">
      <div className="flex justify-between mb-4 flex-wrap">
        <h2 className="text-[20px] font-semibold">
          내가 일한 장소 : 소문난손칼국수 밀면
        </h2>
        <p className="text-gray-500 font-semibold">12/7 (화)ㆍ10:00 ~ 16:00</p>
      </div>
      <div className="flex gap-1 mb-5">
        <img src="/icons/reviews/star.svg" />
        <img src="/icons/reviews/star.svg" />
        <img src="/icons/reviews/star.svg" />
        <img src="/icons/reviews/star.svg" />
        <img src="/icons/reviews/blankStar.svg" />
      </div>
      <form>
        <InputField
          labelName="제목"
          placeholder="제목을 입력해 주세요."
          errorMsg="미입력 알림 텍스트 부분"
        />
        <InputField
          isTextArea={true}
          labelName="내용"
          placeholder="내용을 입력해 주세요."
          isLast={true}
        />
        <p className="text-[18px] font-semibold mt-8 mb-4">
          받을 금액: 64,000원
        </p>
        <Button type="submit" height="lg">
          리뷰 쓰기
        </Button>
      </form>
    </div>
  );
}
