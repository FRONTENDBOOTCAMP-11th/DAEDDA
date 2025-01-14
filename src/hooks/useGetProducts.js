import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = keyword => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return axios.get(`/products/?keyword=${keyword}`);
    },
    select: res => {
      return res.data.item;
    },
    staleTime: 1000 * 10,
  });
};
