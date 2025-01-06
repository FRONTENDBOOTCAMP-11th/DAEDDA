import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const [showPwd, setShowPwd] = useState(false); // 비밀번호: 초기는 보이지 않는 상태
  const [showPwdCheck, setShowPwdCheck] = useState(false); // 비밀번호: 초기는 보이지 않는 상태

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  return (
    <div className="flex flex-col items-center justify-center mb-[40px]">
      <img
        src="/images/smiling_daeddamon.png"
        className="w-[150px] h-[150px] mb-3"
      />
      <div>
        <Button color="purple" height="sm" className="mb-4">
          <span className="p-2">이미지 선택</span>
        </Button>
      </div>

      <div className="w-full">
        <InputField
          type="email"
          placeholder="이메일을 입력해주세요."
          errorMsg="이메일을 입력해주세요."
          maxLength="30"
        ></InputField>
      </div>

      <div className="w-full">
        <InputField
          type="text"
          placeholder="닉네임을 입력해주세요."
          errorMsg="닉네임을 입력해주세요."
          maxLength="10"
        ></InputField>
      </div>
      <div className="relative w-full">
        <InputField
          type="password"
          placeholder="비밀번호를 입력해주세요."
          errorMsg="비밀번호를 입력해주세요."
          maxLength="20"
        ></InputField>
        <img src="/icons/eyeHalf.svg" className="absolute right-3 top-3" />
      </div>
      <div className="relative w-full">
        <InputField
          type="password"
          placeholder="비밀번호를 확인해주세요."
          errorMsg="비밀번호를 입력해주세요."
          maxLength="20"
        ></InputField>
        <img src="/icons/eyeHalf.svg" className="absolute right-3 top-3" />
      </div>

        <div className="w-full">
          <InputField
            type="date"
            errorMsg={errors.date?.message}
            register={register("date", {
              required: "생년 월일을 입력해주세요.",
            })}
          ></InputField>
        </div>
        <div className="w-full">
          <InputField
            type="text"
            maxLength="11"
            placeholder="휴대폰 번호는 '-' 제외하고 입력해주세요."
            errorMsg={errors.phone?.message}
            register={register("phone", {
              required: "휴대폰 번호을 입력해주세요.",
            })}
          ></InputField>
        </div>
        <div className="flex gap-6 w-full mt-5">
          <Button color="white" height="lg">
            취소
          </Button>
          <Button color="purple" height="lg" type="submit">
            계속
          </Button>
        </div>
      </form>
    </div>
  );
}
