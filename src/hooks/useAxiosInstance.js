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

      // 일반 유저 (_id = 4)
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuygnOydtOyngCIsImVtYWlsIjoidTFAbWFya2V0LmNvbSIsImltYWdlIjoiL2ZpbGVzL2ZpbmFsMDEvdXNlci1qYXlnLndlYnAiLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTczNjIzMzU4MSwiZXhwIjoxNzM2MzE5OTgxLCJpc3MiOiJGRVNQIn0.-QhYhmM7NzcJt21pnN6lrSgj35OlCwxxcs1WYI_2rMY",

      // 판매 유저 (_id = 2)
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi7IiY7KCV7ZWg6rKMIOOFi2RkIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmluYWwwMS9FbTlIRGkzc0Mud2VicCIsImxvZ2luVHlwZSI6ImVtYWlsIiwiaWF0IjoxNzM2MjMzNjU2LCJleHAiOjE3MzYzMjAwNTYsImlzcyI6IkZFU1AifQ.LA-mzR0QzbcNl3L45ECN_vM-DBKqynIS5wPW14z74jQ",
    },
  });

  return instance;
}

export default useAxiosInstance;
