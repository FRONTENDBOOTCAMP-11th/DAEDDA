import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetPost = postId => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => {
      return axios.get(`/products/${postId}`);
    },
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });
};
