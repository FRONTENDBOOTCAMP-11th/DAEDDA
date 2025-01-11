import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = userId => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => {
      return axios.get("/products", { params: { seller_id: userId } });
    },
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });
};
