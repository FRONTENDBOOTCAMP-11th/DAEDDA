import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = position => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return axios.get("/orders");
    },
    select: res => {
      return res.data.item.filter(item => item.extra.position === position);
    },
    staleTime: 1000 * 10,
  });
};
