import axiosInstance from "@hooks/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetPosts = userId => {
  return useQuery({
    queryKey: ["posts", userId],
    queryFn: () => {
      return axiosInstance.get("/products", { params: { seller_id: userId } });
    },
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });
};
