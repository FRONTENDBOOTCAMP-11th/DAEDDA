import axios from "axios";

function useAxiosInstance() {
  const instance = axios.create({
    baseURL: "https://todo-api.fesp.shop/api",
    timeout: 1000 * 15,
    headers: {
      "Content-Type": "application/json", // request의 데이터 타입
      accept: "application/json", // response의 데이터 타입
      // 판매 유저로 임시 로그인
      "client-id": "final01",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmluYWwwMS91c2VyLW5lby53ZWJwIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzU2MDg2NjksImV4cCI6MTczNTY5NTA2OSwiaXNzIjoiRkVTUCJ9.M3fLsonLAEv8NBY67Ul5Fn4U4BLJl-8lAiYsVJJUXEc",
    },
  });

  return instance;
}

export default useAxiosInstance;
