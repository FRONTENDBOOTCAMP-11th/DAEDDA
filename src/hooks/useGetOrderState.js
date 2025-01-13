import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

// code가 있으면 code에 해당하는 상태를,
// code가 없으면 orderState를 반환
export const useGetOrderState = code => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["orderState"],
    queryFn: () => {
      return axios.get("/codes/orderState");
    },
    select: res => {
      return code
        ? res.data.item.orderState.codes.find(item => item.code === code)
        : res.data.item.orderState.codes;
    },
    staleTime: 1000 * 10,
  });
};
