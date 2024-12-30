import InputField from "@components/layout/InputField";

export default function MainList() {
  return (
    <div>
      MainList
      <InputField
        labelName="생년월일"
        type="date"
        errorMsg="생년월일 입력은 필수입니다."
      />
      <InputField placeholder="기본 텍스트 인풋" />
      <InputField labelName="이메일" placeholder="이메일을 입력해 주세요." />
      <InputField
        labelName="내용"
        placeholder="내용을 입력해주세요."
        errorMsg="내용 입력은 필수입니다."
        isTextArea={true}
        isLast={true}
      />
    </div>
  );
}
