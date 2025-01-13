import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

// 이메일 로그인 관련 함수들
const signInFn = (axios, formData) => {
  return axios.post(`/users/login`, formData);
};

const handleOnSuccess = (res, setUser, navigate) => {
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
};

const handleOnError = (err, setError) => {
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
};

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

  // 선언
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useUserStore(store => store.setUser);
  const [showPwd, setShowPwd] = useState(false); // 비밀번호: 초기는 보이지 않는 상태

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  // 이메일 로그인 처리
  const signIn = useMutation({
    mutationFn: formData => signInFn(axios, formData),
    onSuccess: res => handleOnSuccess(res, setUser, navigate),
    onError: err => handleOnError(err, setError),
  });

  // 카카오 로그인 처리
  const handleKakako = () => {
    const REST_API_KEY = "7b635f7b3d4379252462f78787fc908b";
    const REDIRECT_URI = "http://localhost:5173/myPage/edit";
    const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

    window.location.href = KAKAO_AUTH_URI;
  };

  // const sendRequest = async code => {
  //   console.log(code);
  //   try {
  //     const response = await axios.post(`/users/login/kakao`, {
  //       code,
  //       redirect_uri: "http://localhost:5173/myPage/edit",
  //       user: {},
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     // console.log(code);
  //     console.error("상태 코드:", error.response?.status);
  //     console.error("상태 텍스트:", error.response?.statusText);
  //     console.error("서버 반환 데이터:", error.response?.data);
  //     console.error("요청 설정:", error.response?.config);
  //   }
  // };

  // useEffect(() => {
  //   const params = new URLSearchParams(location.search);
  //   const code = params.get("code");
  //   console.log(code); //코드 가져옴

  //   if (code) {
  //     // 서버에 코드 전송하기
  //     sendRequest(code);
  //     console.log("test");
  //     navigate(`/mypage/edit?code=${code}`);
  //   }
  // }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-auto">
      <img src="/logos/header-logo.png" className="mt-8 h-[70px]" />
      <img src="/images/daeddamon.png" className="my-7 w-[180px] h-[180px]" />
      <form
        onSubmit={handleSubmit(signIn.mutate)}
        className="w-full"
        noValidate
      >
        <InputField
          type="email"
          placeholder="이메일"
          maxLength={30}
          errorMsg={errors.email?.message}
          register={register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "이메일 형식으로 작성해주세요.",
            },
          })}
        ></InputField>
        <div className="relative">
          <InputField
            type={showPwd ? "text" : "password"}
            placeholder="비밀번호"
            errorMsg={errors.password?.message}
            register={register("password", {
              required: "비밀번호를 입력해주세요.",
              minLength: {
                value: 8,
                message: "비밀번호는 최소 8자리 이상 입력해야 합니다.",
              },
            })}
            maxLength={20}
          ></InputField>
          <img
            src={showPwd ? "/icons/eye.svg" : "/icons/eyeHalf.svg"}
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
          <Button color="yellow" height="lg" onClick={handleKakako}>
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
