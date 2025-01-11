import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetMyBookMark = targetUserId => {
  const axios = useAxiosInstance();
  return useQuery({
    queryKey: ["myBookmark", targetUserId],
    queryFn: () => {
      return axios.get(`/bookmarks/user/${targetUserId}`);
    },
    select: res => res.data.item,
    staleTime: 1000 * 10,
    enabled: !!targetUserId,
  });
};
