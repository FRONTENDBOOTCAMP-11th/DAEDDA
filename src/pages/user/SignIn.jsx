import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  // propTypes
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

  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const setUser = useUserStore(store => store.setUser);
  const [showPwd, setShowPwd] = useState(false); // 비밀번호: 초기는 보이지 않는 상태

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const signIn = useMutation({
    mutationFn: formData => axios.post(`/users/login`, formData),
    onSuccess: res => {
      console.log(res);

      const user = res.data.item;
      setUser({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        image: user.image,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
        extra: {
          birthday: user.extra?.birthday,
        },
      });
      console.log("성공");
      navigate("/");
    },
    onError: err => {
      if (err.response) {
        const errorCode = err.response.status;

        switch (errorCode) {
          case 403:
            console.log("오류 코드 403: 아이디 비밀번호 불일치");
            setError("password", {
              message: "이메일과 비밀번호를 확인하세요.",
            });
            break;
          case 500:
            console.log("오류 코드 500: 서버오류");
            setError("password", { message: "잠시 후에 다시 시도해주세요." });
            break;
          default:
            console.error("기타 오류:", err.response.data.message);
            break;
        }
      } else {
        console.error("알 수 없는 오류입니다:", err.message);
      }
    },
  });
  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-auto">
      <img src="/src/assets/logos/header-logo.png" className="mt-8 h-[70px]" />
      <img
        src="/src/assets/images/daeddamon.png"
        className="my-7 w-[180px] h-[180px]"
      />
      <form
        onSubmit={handleSubmit(signIn.mutate)}
        className="w-full"
        noValidate
      >
        <InputField
          type="email"
          placeholder="이메일"
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
        <Link to="/user/terms" className="underline text-sm">
          회원가입
        </Link>
      </div>
    </div>
  );
}
