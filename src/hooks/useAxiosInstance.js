import useUserStore from "@zustand/userStore";
import axios from "axios";

function useAxiosInstance() {
  const { user } = useUserStore();
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
    if (user) {
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
    error => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수가 호출됨
      // 공통 에러 처리
      console.error("인터셉터", error);
      return Promise.reject(error);
    },
  );

  return instance;
}

export default useAxiosInstance;
