import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = orderId => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => {
      return axios.get(`/orders/${orderId}`);
    },
    select: res => {
      return res.data.item;
    },
    staleTime: 1000 * 10,
  });
};
