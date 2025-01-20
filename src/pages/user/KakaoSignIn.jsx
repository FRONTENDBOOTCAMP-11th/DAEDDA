import useAxiosInstance from "@hooks/useAxiosInstance";
import useUserStore from "@zustand/userStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function KakaoSignIn() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();

  // 카카오 로그인 코드 시작: 로그인 성공시 url에 code가 보임
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");

    if (code) {
      sendKakaoRequest(code);
    }
  }, [location.search]);

  // 받은 code로 요청 보내기
  const sendKakaoRequest = async code => {
    try {
      const response = await axios.post(`/users/login/kakao`, {
        code,
        redirect_uri: `${window.location.origin}/users/login/kakao`,
        user: {
          type: "seller",
        },
      });

      const { data } = response;

      if (data.item) {
        if (data.item.isNew) {
          // 카카오로부터 받은 사용자 정보
          const newUserData = {
            _id: data.item._id,
            name: data.item.name,
            image: data.item.image,
            phone: "",
            type: "seller",
            extra: {
              birthday: "",
            },
            accessToken: data.item.token.accessToken,
            refreshToken: data.item.token.refreshToken,
            loginType: "kakao",
            isNew: true,
          };

          setUser(newUserData);

          // 정보 setUser에 담고 edit 창으로 넘어가서 추가 정보 받기
          navigate("/myPage/edit");
        } else {
          const newUserData = {
            _id: data.item._id,
            name: data.item.name,
            image: data.item.image,
            phone: data.item.phone,
            type: "seller",
            extra: {
              birthday: data.item.extra.birthday,
            },
            accessToken: data.item.token.accessToken,
            refreshToken: data.item.token.refreshToken,
            loginType: "kakao",
          };

          // 기존 회원 정보 저장 후 메인 페이지로 이동하기
          setUser(newUserData);

          navigate("/");
        }
      }
    } catch (error) {
      console.error("카카오 로그인 실패", error);
    }
  };

  // return <div>카카오페이지</div>;
}
