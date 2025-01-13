import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = userId => {
  const axios = useAxiosInstance();
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return axios.get("/users", { params: { _id: userId } });
    },
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });
};
