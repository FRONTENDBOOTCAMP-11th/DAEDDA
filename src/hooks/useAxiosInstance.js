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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjQsInR5cGUiOiJ1c2VyIiwibmFtZSI6IuygnOydtOyngCIsImVtYWlsIjoidTFAbWFya2V0LmNvbSIsImltYWdlIjoiL2ZpbGVzL2ZpbmFsMDEvdXNlci1qYXlnLndlYnAiLCJsb2dpblR5cGUiOiJlbWFpbCIsImlhdCI6MTczNjMyMDc0NSwiZXhwIjoxNzM2NDA3MTQ1LCJpc3MiOiJGRVNQIn0.0_uB2Ww_FwoQ6EnTliYPVSgmQhSsprUHcMCTffZoTdY",

      // 판매 유저 (_id = 2)
      // Authorization:
      //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOjIsInR5cGUiOiJzZWxsZXIiLCJuYW1lIjoi64Sk7JikIiwiZW1haWwiOiJzMUBtYXJrZXQuY29tIiwiaW1hZ2UiOiIvZmlsZXMvZmluYWwwMS91c2VyLW5lby53ZWJwIiwibG9naW5UeXBlIjoiZW1haWwiLCJpYXQiOjE3MzYzMjA5NDUsImV4cCI6MTczNjQwNzM0NSwiaXNzIjoiRkVTUCJ9.EUK09zLl2UQhSG1OKpKOkZ8NZ1xRpsGS1dI9d2b-mVg",
    },
  });

  return instance;
}

export default useAxiosInstance;
