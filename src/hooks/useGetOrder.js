import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = productId => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["orders", productId],
    queryFn: () => {
      return axios.get("/orders");
    },
    select: res => {
      return res.data.item.filter(order => {
        return order.products[0]._id === +productId;
      });
    },
    staleTime: 1000 * 10,
  });
};
