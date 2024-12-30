import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";

export default function Edit() {
  return (
    <>
      <div className="mb-[40px]">
        <div className=" border-gray-200 border-b mb-5">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="relative inline-block">
              <img
                src="/src/assets/images/smiling_daeddamon.png"
                alt="프로필 이미지"
                className="size-32 mx-auto mb-3 "
              />
              <img
                src="/icons/imgEdit.svg"
                alt="프로필 이미지 수정"
                className="absolute right-2 bottom-2"
              />
            </div>
            <Button height="sm" color="purple" className="w-32 mb-3">
              save change
            </Button>
          </div>
        </div>
        <InputField
          errorMsg="미입력 알림 텍스트 부분"
          labelName="닉네임"
          placeholder="닉네임을 입력해 주세요"
        ></InputField>
        <InputField
          errorMsg="미입력 알림 텍스트 부분"
          labelName="이메일"
          placeholder="이메일을 입력해 주세요"
        ></InputField>
        <InputField
          errorMsg="미입력 알림 텍스트 부분"
          labelName="Id"
          placeholder="아이디를 입력해 주세요"
        ></InputField>
        <InputField
          errorMsg="미입력 알림 텍스트 부분"
          labelName="Pw"
          placeholder="비밀번호를 입력해 주세요"
        ></InputField>
        <div className="mb-9">
          <InputField
            errorMsg="미입력 알림 텍스트 부분"
            labelName="생년월일"
            type="date"
            placeholder="연도-월-일"
          ></InputField>
        </div>
        <Button height="lg" className="w-full mb-4">
          로그아웃
        </Button>
        <Button height="lg">회원 탈퇴</Button>
      </div>
    </>
  );
}
