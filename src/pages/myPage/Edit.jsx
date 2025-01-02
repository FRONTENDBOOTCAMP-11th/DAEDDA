import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import { useForm } from "react-hook-form";

export default function Edit() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: "",
    },
  });

  function onSubmit() {
    alert("수정되었습니다");
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[40px]">
          <div className=" border-gray-200 border-b mb-5">
            <div className="flex flex-col items-center justify-center h-full mb-4">
              <div className="relative inline-block -z-10">
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
            </div>
          </div>
          <InputField
            errorMsg={errors.nickname?.message}
            labelName="닉네임"
            placeholder="닉네임을 입력해 주세요"
            register={register("nickname", {
              required: "닉네임은 필수 입력 입니다.",
              minLength: {
                value: 2,
                message: "닉네임은 두글자 이상 입력해주세요",
              },
              maxLength: {
                value: 10,
                message: "닉네임은 최대 10글자 입력 가능합니다.",
              },
            })}
          />
          <InputField
            errorMsg={errors.email?.message}
            labelName="이메일"
            placeholder="이메일을 입력해 주세요"
            type="email"
            register={register("email", {
              required: "이메일은 필수입력입니다",
              pattern: {
                value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                message: "올바른 이메일 형식을 입력하세요",
              },
            })}
          />
          <InputField
            errorMsg={errors.id?.message}
            labelName="Id"
            placeholder="아이디를 입력해 주세요"
            register={register("id", {
              required: "아이디 입력은 필수입니다",
            })}
          />
          <InputField
            errorMsg={errors.password?.message}
            labelName="Pw"
            placeholder="비밀번호를 입력해 주세요"
            type="password"
            register={register("password", {
              required: "비밀번호 입력은 필수입니다",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                message: "비밀번호는 8~20자, 영문자와 소문자를 포함해야합니다.",
              },
            })}
          />
          <div className="mb-9">
            <InputField
              errorMsg={errors.bitrh?.message}
              labelName="생년월일"
              type="date"
              placeholder="연도-월-일"
              register={register("bitrh", {
                required: "생년월일은 필수 입력입니다",
              })}
            />
          </div>
          <Button height="lg" className="w-full mb-4">
            로그아웃
          </Button>
          <Button height="lg" type="submit">
            수정하기
          </Button>
        </div>
      </form>
    </>
  );
}
