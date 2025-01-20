import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function useAxiosInstance() {
  const REFRESH_URL = "/auth/refresh";
  const navigate = useNavigate();
  const { user, setUser, resetUser } = useUserStore();
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      "client-id": "final01",
    },
  });

  // 요청 인터셉터 추가하기
  instance.interceptors.request.use(config => {
    if (user && config.url !== REFRESH_URL) {
      config.headers["Authorization"] = `Bearer ${user.accessToken}`;
    }
    return config;
  });

  // 응답 인터셉터 추가하기
  instance.interceptors.response.use(
    response => {
      // 2xx 범위에 있는 상태 코드는 이 함수가 호출됨
      // 응답 데이터를 이용해서 필요한 공통 작업 수행

      return response;
    },
    async error => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error("인터셉터", error);
      // return Promise.reject(error);

      const { config, response } = error;

      // 로그인 인증 실패
      if (response?.status === 401) {
        if (config.url === REFRESH_URL) {
          // 리프레시 토큰 만료시
          alert("로그인이 필요한 페이지입니다.");
          resetUser();
          navigate("/user/signIn");
        }
        // else {
        //   alert("엑세스 토큰 만료 로그인이 필요합니다.");
        //   resetUser();
        //   navigate("/user/signIn");
        // }
        else if (user) {
          // accessToken 만료시 refreshToken으로 재발급 요청
          const {
            data: { accessToken },
          } = await instance.get(REFRESH_URL, {
            headers: {
              Authorization: `Bearer ${user.refreshToken}`,
            },
          });

          // 갱신된 accessToken 으로 재요청
          setUser({ ...user, accessToken });
          // 새롭게 갱신된 accessToken

          config.headers.Authorization = `Bearer ${accessToken}`;
          return axios(config);
        } else {
          // 로그인이 안 된 경우
          alert("로그인이 필요한 페이지입니다.");
          navigate("/user/signIn");
        }
      }
      return Promise.reject(error);
    },
  );

  return instance;
}

export default useAxiosInstance;
