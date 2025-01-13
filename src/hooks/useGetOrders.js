import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = () => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return axios.get("/orders");
    },
    select: res => {
      return res.data.item;
    },
    staleTime: 1000 * 10,
  });
};
