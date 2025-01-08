import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUp() {
  const [showPwd, setShowPwd] = useState(false); // 비밀번호: 초기는 보이지 않는 상태
  const [showPwdCheck, setShowPwdCheck] = useState(false); // 비밀번호 체크: 초기는 보이지 않는 상태
  const [preview, setPreview] = useState("/images/smiling_daeddamon.png"); // 이미지: 디폴트는 대따몬 이미지
  const [uploadImg, setUploadImg] = useState(null);

  const axios = useAxiosInstance();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  // 이미지 프리뷰 변경
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setUploadImg(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이메일 중복 체크
  const emailCheck = useMutation({
    mutationFn: email =>
      axios.get(`/users/email`, {
        params: { email },
      }),
    onSuccess: () => {
      console.log("이메일 중복 검증 통과");
    },
    onError: error => {
      if (error.response?.status === 409) {
        setError("email", { message: "이미 사용 중인 이메일입니다." });
      } else {
        setError("email", { message: "잠시 후에 다시 시도해주세요." });
      }
    },
  });

  // 회원 정보를 서버에 보냄
  const signUp = useMutation({
    mutationFn: formData =>
      axios.post(`/users/`, {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        image: formData.image,
        type: "user",
        extra: {
          birthday: formData.birthday,
        },
      }),
    onSuccess: () => {
      console.log("회원가입 성공");
    },
    onError: error => {
      console.error("회원가입 실패", error);
    },
  });

  //제출 했을 때
  const onSubmit = data => {
    // 이메일 중복 체크
    emailCheck.mutate(data.email, {
      onSuccess: () => {
        console.log("이메일 중복 테스트 통과");

        // 중복 테스트 통과 후 회원가입 진행
        signUp.mutate(data);
      },
      onError: () => {
        // 이메일 중복 에러 메시지 처리 (이미 emailCheck의 onError에서 처리됨)
        console.error("이메일 중복 에러");
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mb-[40px]">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          <div className="relative inline-block">
            <label htmlFor="image-upload" className="cursor-pointer">
              <img src={preview} className="w-[150px] h-[150px] mb-3" />
              <img
                src="/icons/imgEdit.svg"
                className="absolute right-2 bottom-2"
              />
            </label>
          </div>

          <input
            type="file"
            id="image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          ></input>
        </div>
        <div className="w-full">
          <InputField
            type="email"
            placeholder="이메일을 입력해주세요."
            maxLength="30"
            errorMsg={errors.email?.message}
            register={register("email", {
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "이메일 형식으로 작성해주세요.",
              },
            })}
          ></InputField>
        </div>
        <div className="w-full">
          <InputField
            type="text"
            placeholder="닉네임을 입력해주세요."
            maxLength="10"
            errorMsg={errors.name?.message}
            register={register("name", {
              required: "닉네임을 입력해주세요",
              minLength: {
                value: 2,
                message: "닉네임은 최소 2자리 이상 입력해야 합니다.",
              },
            })}
          ></InputField>
        </div>
        <div className="relative w-full">
          <InputField
            type={showPwd ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            maxLength="20"
            errorMsg={errors.password?.message}
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자리 이상 입력해야 합나디.",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "비밀번호는 영문과 숫자를 포함해야 합니다.",
              },
            })}
          ></InputField>
          <img
            src={
              showPwd ? "/public/icons/eye.svg" : "/public/icons/eyeHalf.svg"
            }
            className="absolute right-3 top-3"
            onClick={() => setShowPwd(pre => !pre)}
          />
        </div>
        <div className="relative w-full">
          <InputField
            type={showPwdCheck ? "text" : "password"}
            placeholder="비밀번호를 확인해주세요."
            maxLength="20"
            errorMsg={errors.pwdCheck?.message}
            register={register("pwdCheck", {
              required: "비밀번호를 확인해주세요.",
              validate: value => {
                return (
                  value === watch("password") || "비밀번호가 일치하지 않습니다."
                );
              },
            })}
          ></InputField>
          <img
            src={
              showPwdCheck
                ? "/public/icons/eye.svg"
                : "/public/icons/eyeHalf.svg"
            }
            className="absolute right-3 top-3"
            onClick={() => setShowPwdCheck(pre => !pre)}
          />
        </div>

        <div className="w-full">
          <InputField
            type="date"
            errorMsg={errors.birthday?.message}
            register={register("birthday", {
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
              pattern: {
                value: /^[0-9]+$/,
                message: "숫자만 입력 가능합니다.",
              },
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
