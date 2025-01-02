import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const [showPwd, setShowPwd] = useState(false); // 초기는 보이지 않는 상태

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = formData => {
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-auto">
      <img src="/src/assets/logos/header-logo.png" className="mt-8 h-[70px]" />
      <img
        src="/src/assets/images/daeddamon.png"
        className="my-7 w-[180px] h-[180px]"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <InputField
          type="email"
          placeholder="이메일"
          maxLength="30"
          errorMsg={errors.email?.message}
          register={register("email", {
            required: " 이메일을 입력해주세요.",
          })}
        ></InputField>
        <div className="relative mb-5">
          <InputField
            type={showPwd ? "text" : "password"}
            placeholder="비밀번호"
            errorMsg={errors.password?.message}
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
            })}
            maxLength="20"
          ></InputField>
          <img
            src={
              showPwd ? "/public/icons/eye.svg" : "/public/icons/eyeHalf.svg"
            }
            className="absolute right-3 top-3"
            onClick={() => setShowPwd(pre => !pre)}
          />
        </div>
        <Button color="purple" height="lg" type="submit">
          로그인
        </Button>

        <div className="w-full relative mt-2">
          <img
            src="/icons/kakao.svg"
            className="absolute top-3 left-2 w-6 h-6"
          />
          <Button color="yellow" height="lg">
            카카오 로그인
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p className="font-bold text-sm">대타를 찾고 있다면?</p>
        <a href="#" className="underline text-sm">
          회원가입
        </a>
      </div>
    </div>
  );
}
