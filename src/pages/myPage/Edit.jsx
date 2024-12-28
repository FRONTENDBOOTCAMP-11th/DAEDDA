import InputField from "@components/layout/InputField";

export default function Edit() {
  return (
    <>
      <div className=" border-gray-200 border-b mb-5">
        <img
          src="/src/assets/images/smiling_daeddamon.png"
          alt="프로필 이미지"
          className="size-32 m-auto "
        />
        <p className="bg-primary text-white max-w-[144px] px-6 py-2 rounded-md ml-auto  ">
          save change
        </p>
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

      <button className="h-12 bg-primary text-white font-bold text-xl w-full mb-4">
        로그아웃
      </button>
      <button className="h-12 bg-primary text-white font-bold text-xl w-full mb-4">
        회원탈퇴
      </button>
    </>
  );
}
