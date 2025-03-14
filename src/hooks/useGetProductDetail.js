import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDetail = productId => {
  const axios = useAxiosInstance();
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => {
      return axios.get(`/seller/products/${productId}`);
    },
    select: res => res.data.item,
    staleTime: 1000 * 10,
    enabled: !!productId,
  });
};
