import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderState = code => {
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
    const res = data.orderState.codes.find(item => item.code === code);
    if (res) return res.value;
  }
  return "";
};
