import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";

export default function ReviewWrite() {
  return (
    <div>
      <InputField
        placeholder="나 대신 일하는 사람을 검색해보세요."
        isLast={true}
      />
      <div className="flex gap-4 mt-4 flex-wrap mb-5">
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          구인 중
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          구인 완료
        </div>
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          대타 완료
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          송금 완료
        </div>
      </div>

      <div className="p-4 rounded-3xl shadow-custom-shadow mb-5 relative">
        <div className="w-[83px] absolute top-4 right-4">
          <Button color="white" width="xl" height="sm">
            취소
          </Button>
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-bold">송금완료</h4>
          <p>소문난손칼국수 밀면</p>
          <p>64,000원</p>
          <p>12/7 (화)ㆍ10:00 ~ 16:00</p>
        </div>
        <Button color="purple" height="md" className="mb-0">
          리뷰 작성하기
        </Button>
      </div>

      <div className="p-4 rounded-3xl shadow-custom-shadow mb-5 relative">
        <div className="w-[83px] absolute top-4 right-4">
          <Button color="white" width="xl" height="sm">
            취소
          </Button>
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-bold">구인 완료</h4>
          <p>기장대게할인마트</p>
          <p>90,000원</p>
          <p>12/19 (목)ㆍ10:00 ~ 16:00</p>
        </div>
        <Button color="white" height="md" className="mb-0">
          리뷰 작성하기
        </Button>
      </div>
    </div>
  );
}
