import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";

export default function MainEdit() {
  return (
    <form className="mb-[40px]">
      <div className="mt-5">
        <InputField
          labelName="제목"
          id="title"
          type="text"
          placeholder="제목"
          errorMsg="제목 입력은 필수입니다."
        />
      </div>

      <fieldset className="">
        <label htmlFor="photo" className="text-[16px] font-bold">
          근무지 사진
        </label>
        <label
          htmlFor="image-upload"
          className="mt-2 w-[136px] h-[136px] flex items-center justify-center rounded-lg border border-dashed cursor-pointer"
        >
          <img src="/public/icons/plus.svg" className="w-5 h-5" />
        </label>

        <input
          type="file"
          id="image-upload"
          accept="image/*"
          className="hidden"
        />
        <div className="my-2">
          <p className="text-red text-[12px]">*사진 1장은 필수 입니다.</p>
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[16px] font-bold mb-2">위치</legend>
        <div className="max-w-screen-sm h-24 bg-slate-500 mb-7 rounded-lg flex items-center justify-center">
          지도
        </div>
        <InputField
          type="text"
          id="address"
          placeholder="상세 주소"
          errorMsg="주소 입력은 필수입니다."
        />
      </fieldset>

      <fieldset>
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
        <InputField type="date" errorMsg="생년월일 입력은 필수입니다." />
      </fieldset>

      <fieldset>
        <InputField
          type="text"
          labelName="근무 내용"
          id="workTxt"
          errorMsg="근무 내용 입력은 필수입니다."
          isTextArea={true}
        />
      </fieldset>
      <div className="mt-7">
        <Button color="purple" height="lg" type="submit">
          수정
        </Button>
      </div>
    </form>
  );
}
