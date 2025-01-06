import axios from "axios";

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: "https://11.fesp.shop",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      // 판매 유저로 임시 로그인
      "client-id": "final01",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmluYWwwMS91c2VyLW5lby53ZWJwIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzU4Njk5NzQsImV4cCI6MTczODQ2MTk3NCwiaXNzIjoiRkVTUCJ9.DG3Ap4YpO6gELIrOWs4xnUDPIf6cT6Ia6uI0nGNsE5M",
    },
  });

  return instance;
}

export default useAxiosInstance;
