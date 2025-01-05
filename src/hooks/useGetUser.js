import axiosInstance from "@hooks/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = userId => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      return axiosInstance.get("/users", { params: { _id: userId } });
    },
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });
};
