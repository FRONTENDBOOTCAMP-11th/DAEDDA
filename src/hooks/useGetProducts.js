import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (userId, select) => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["products", userId],
    queryFn: () => {
      return axios.get("/products", { params: { seller_id: userId } });
    },
    select: res => {
      return select ? select(res.data.item) : res.data.item;
    },
    staleTime: 1000 * 10,
  });
};

export const useProductsFilter = (userId, states) => {
  return useGetProducts(userId, data => {
    if (states.length === 0) {
      return data;
    } else {
      return data.filter(product => {
        return states.some(state => state === product.extra.state);
      });
    }
  });
};
