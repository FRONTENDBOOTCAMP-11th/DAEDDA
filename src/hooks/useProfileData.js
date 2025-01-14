import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export function useProfileData(userId) {
  const axios = useAxiosInstance();
  const { data: reviews, isLoading: isReviewsLoading } = useQuery({
    queryKey: ["reviews", userId],
    queryFn: () =>
      axios.get(`/replies/seller/${userId}`).then(res => res.data.item),
  });

  const { data: partTime, isLoading: isPartTimeLoading } = useQuery({
    queryKey: ["partTimeReviews", userId],
    queryFn: () =>
      axios.get(`users/${userId}/bookmarks`).then(res => res.data.item),
  });

  const { data: userData, isLoading: isUserLoading } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => axios.get(`/users/${userId}`).then(res => res.data),
  });

  return {
    reviews,
    partTime,
    userData,
    isLoading: isReviewsLoading || isPartTimeLoading || isUserLoading,
  };
}
