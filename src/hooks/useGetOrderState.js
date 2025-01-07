import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderState = state => {
  const axios = useAxiosInstance();

  const { data } = useQuery({
    queryKey: ["orderState"],
    queryFn: () => {
      return axios.get("/codes/orderState");
    },
    select: res => {
      return res.data.item;
    },
    staleTime: 1000 * 10,
  });

  if (data) {
    const code = data.orderState.codes.filter(item => item.code === state);
    return code[0].value;
  }
};
