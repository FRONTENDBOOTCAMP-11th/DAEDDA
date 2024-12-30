import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img src="/src/assets/logos/header-logo.png" className="mt-8 h-[70px]" />
      <img
        src="/src/assets/images/daeddamon.png"
        className="my-7 w-[180px] h-[180px]"
      />
      <div className="w-full">
        <InputField
          type="email"
          placeholder="이메일"
          errorMsg="이메일을 입력해주세요."
          maxLength="30"
        ></InputField>
      </div>
      <div className="relative w-full">
        <InputField
          type="password"
          placeholder="비밀번호"
          errorMsg="비밀번호를 입력해주세요."
          maxLength="20"
        ></InputField>
        <img src="/icons/eyeHalf.svg" className="absolute right-3 top-3" />
      </div>
      <Button color="purple" height="lg">
        로그인
      </Button>

      <div className="w-full relative mt-2">
        <img src="/icons/kakao.svg" className="absolute top-3 left-2 w-6 h-6" />
        <Button color="yellow" height="lg">
          카카오 로그인
        </Button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p className="font-bold text-sm">대타를 찾고 있다면?</p>
        <a href="#" className="underline text-sm">
          회원가입
        </a>
      </div>
    </div>
  );
}
