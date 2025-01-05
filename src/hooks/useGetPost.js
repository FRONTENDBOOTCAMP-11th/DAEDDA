import axiosInstance from "@hooks/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetPost = postId => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => {
      return axiosInstance.get(`/products/${postId}`);
    },
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });
};
