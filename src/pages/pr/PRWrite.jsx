import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";

export default function PRWrite() {
  return (
    <form className="mb-[40px]">
      <div className="mt-5">
        <InputField
          labelName="제목"
          type="text"
          placeholder="제목"
          errorMsg="제목 입력은 필수입니다."
        />
      </div>

      <fieldset>
        <label htmlFor="address" className="text-[16px] font-bold mb-2">
          위치
        </label>
        <div className="h-24 bg-slate-500 mb-7 rounded-lg flex items-center justify-center">
          지도
        </div>
        <InputField
          type="text"
          id="address"
          placeholder="상세 주소"
          isLast={true}
          errorMsg="주소 입력은 필수입니다."
        />
      </fieldset>

      <fieldset className="mt-2">
        <InputField
          labelName="핸드폰 번호"
          id="phoneNum"
          type="text"
          placeholder="핸드폰 번호"
          errorMsg="핸드폰 번호 입력은 필수입니다."
        />
      </fieldset>

      <fieldset>
        <InputField
          labelName="상세 경력"
          id="career"
          type="text"
          placeholder="상세 경력"
          isTextArea={true}
          errorMsg="상세 경력 입력은 필수입니다."
        />
      </fieldset>

      <fieldset>
        <InputField
          labelName="자신을 어필하세요!"
          id="career"
          type="text"
          placeholder="자신을 어필하세요!"
          isLast={true}
          isTextArea={true}
          errorMsg="어필을 하면 뽑힐 가능성이 높아집니다 !"
        />
      </fieldset>

      <div className="mt-11">
        <Button color="purple" type="submit" height="lg">
          등록
        </Button>
      </div>
    </form>
  );
}
