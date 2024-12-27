import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";

export default function MainWrite() {
  return (
    <div className="min-h-screen">
      <div className="w-full">
        <form className="max-w-screen-sm">
          <div className="mt-5">
            <InputField
              labelName="제목"
              id="title"
              type="text"
              placeholder="제목"
              errorMsg="제목 입력은 필수입니다."
            />
          </div>

          <fieldset className="mt-7">
            <legend className="text-[16px] font-bold mb-2">위치</legend>
            <div className="w-full max-w-screen-sm h-24 bg-slate-500 mb-7 rounded-lg flex items-center justify-center">
              지도
            </div>
            <InputField
              type="text"
              id="address"
              placeholder="상세 주소"
              errorMsg="주소 입력은 필수입니다."
              isLast={true}
            />
          </fieldset>

          <fieldset className="mt-7">
            <InputField
              labelName="근무 조건"
              type="text"
              placeholder="가게 이름"
              errorMsg="가게 이름 입력은 필수입니다."
            />

            <InputField
              type="text"
              placeholder="급여"
              errorMsg="급여 입력은 필수입니다."
            />

            <InputField
              type="text"
              errorMsg="근무 시간 입력은 필수입니다."
              placeholder="근무 시간은 00:00 - 00:00으로 입력해주세요."
            />
            <InputField
              type="date"
              errorMsg="생년월일 입력은 필수입니다."
              isLast={true}
            />
          </fieldset>

          <fieldset className="mt-7">
            <InputField
              type="text"
              labelName="근무 내용"
              id="workTxt"
              errorMsg="근무 내용 입력은 필수입니다."
              isLast={true}
              isTextArea={true}
            />
          </fieldset>
          <div className="mt-11">
            <Button color="purple" height="lg" type="submit">
              등록
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
