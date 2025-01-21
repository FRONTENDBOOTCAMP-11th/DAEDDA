import Button from "@components/Button";
import InputField from "@components/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import useSignIn from "@hooks/useSignIn";
import { useMutation } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  errorMsg: PropTypes.string,
  register: PropTypes.object.isRequired,
};

Button.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default function SignUp() {
  const [showPwd, setShowPwd] = useState(false); // 비밀번호: 초기는 보이지 않는 상태
  const [showPwdCheck, setShowPwdCheck] = useState(false); // 비밀번호 체크: 초기는 보이지 않는 상태
  const [preview, setPreview] = useState("/images/smiling_daeddamon.png"); // 이미지: 디폴트는 대따몬 이미지
  const fileInput = useRef(null);

  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const signIn = useSignIn();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    defaultValues: {
      email: "worker05@gmail.com",
      name: "대따몬",
      password: "asdf1111",
      pwdCheck: "asdf1111",
      phone: "01012345678",
    },
  });

  // 이미지 프리뷰 변경
  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      // setUploadImg(file);
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
    onSuccess: () => {},
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
    mutationFn: async formData => {
      // 자동 로그인을 위한 값 넘기기
      const email = formData.email;
      const password = formData.password;

      // 프로필 이미지
      let uploadedImgPath = "";

      // 이미지를 첨부했을 경우
      if (fileInput.current?.files?.[0]) {
        const imgFormData = new FormData();
        imgFormData.append("attach", fileInput.current.files[0]);

        const fileRes = await axios.post(`/files/`, imgFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // 업로드된 이미지 경로 확인
        uploadedImgPath = fileRes.data.item[0]?.path;
      }

      const updatedFormData = {
        ...formData,
        password: formData.password,
        image: uploadedImgPath,
        type: "seller",
        extra: {
          birthday: formData.birthday,
        },
      };

      delete updatedFormData.birthday;
      delete updatedFormData.pwdCheck;

      // 데이터 확인 및 회원가입 요청 전송
      await axios.post(`/users/`, updatedFormData);
      // alert(`환영합니다 ${updatedFormData.name} 님!`);
      toast.success(`환영합니다 ${updatedFormData.name} 님!`, {
        icon: <img src="/icons/fire.svg" alt="success" />,
      });

      return { email, password };
    },

    onSuccess: ({ email, password }) => {
      signIn.mutate({ email, password });
    },

    onError: error => {
      console.error("실패", error.response.data);
    },
  });

  // 폼 제출 - "계속" 버튼 클릭시
  const onSubmit = data => {
    // 이메일 중복 체크
    emailCheck.mutate(data.email, {
      onSuccess: () => {
        // 중복 테스트 통과 후 회원가입 진행
        signUp.mutate(data);
      },
      onError: () => {
        // 이메일 중복 에러 메시지 처리 (이미 emailCheck의 onError에서 처리됨)
        console.error("이메일 중복 에러");
      },
    });
  };

  const handleCancel = () => {
    navigate("/user/signIn");
  };

  const preventSpace = e => {
    if (e.key === " ") e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center mb-[40px]">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
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
            ref={fileInput}
          ></input>
        </div>
        <div className="w-full">
          <InputField
            type="email"
            placeholder="이메일을 입력해주세요."
            maxLength={30}
            errorMsg={errors.email?.message}
            onKeyPress={preventSpace}
            register={register("email", {
              required: "이메일 입력은 필수입니다.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "유효한 이메일 형식으로 작성해주세요.",
              },
            })}
          ></InputField>
        </div>
        <div className="w-full">
          <InputField
            type="text"
            placeholder="닉네임을 입력해주세요."
            maxLength={10}
            errorMsg={errors.name?.message}
            onKeyPress={preventSpace}
            register={register("name", {
              required: "닉네임 입력은 필수 입니다.",
              minLength: {
                value: 2,
                message: "닉네임은 최소 2글자 이상 입력해주세요.",
              },
            })}
          ></InputField>
        </div>
        <div className="relative w-full">
          <InputField
            type={showPwd ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요."
            maxLength={20}
            onKeyPress={preventSpace}
            errorMsg={errors.password?.message}
            register={register("password", {
              required: "비밀번호 입력은 필수입니다.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자리 이상 입력해야 합나다.",
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                message: "비밀번호는 영문과 숫자를 포함해야 합니다.",
              },
            })}
          ></InputField>
          <img
            src={showPwd ? "/icons/eye.svg" : "/icons/eyeHalf.svg"}
            className="absolute right-3 top-3"
            onClick={() => setShowPwd(pre => !pre)}
          />
        </div>
        <div className="relative w-full">
          <InputField
            type={showPwdCheck ? "text" : "password"}
            placeholder="비밀번호를 확인해주세요."
            maxLength={20}
            onKeyPress={preventSpace}
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
            src={showPwdCheck ? "/icons/eye.svg" : "/icons/eyeHalf.svg"}
            className="absolute right-3 top-3"
            onClick={() => setShowPwdCheck(pre => !pre)}
          />
        </div>

        <div className="w-full">
          <InputField
            type="date"
            errorMsg={errors.birthday?.message}
            register={register("birthday", {
              required: "생년월일 입력은 필수입니다..",
            })}
            max={new Date().toISOString().split("T")[0]}
          ></InputField>
        </div>
        <div className="w-full">
          <InputField
            type="text"
            maxLength={11}
            placeholder="휴대폰 번호는 '-'를 제외하고 입력해주세요."
            onKeyPress={preventSpace}
            errorMsg={errors.phone?.message}
            register={register("phone", {
              required: "휴대폰 번호을 입력은 필수 입니다.",
              pattern: {
                value: /^01\d{8,9}$/,
                message: "휴대폰 번호는 '-' 없는 유효한 번호를 입력해주세요.",
              },
            })}
          ></InputField>
        </div>
        <div className="flex gap-6 w-full mt-5">
          <Button color="white" height="lg" onClick={handleCancel}>
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
