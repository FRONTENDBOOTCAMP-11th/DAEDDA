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
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmluYWwwMS91c2VyLW5lby53ZWJwIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzU3OTgwMzMsImV4cCI6MTczNTg4NDQzMywiaXNzIjoiRkVTUCJ9.7ar0wVSaZavy4yb-2y3SnquwzXH5Px8Hiq24Zoz9wrA",
    },
  });

  return instance;
}

export default useAxiosInstance;
