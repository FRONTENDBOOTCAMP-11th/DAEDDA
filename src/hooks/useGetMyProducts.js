import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetMyProducts = (userId, select, keyword) => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["products", userId],
    queryFn: () => {
      return axios.get("/products", {
        params: { seller_id: userId, keyword: keyword },
      });
    },
    select: res => {
      return select ? select(res.data.item) : res.data.item;
    },
    staleTime: 1000 * 10,
  });
};

export const useMyProductsFilter = (userId, states, keyword) => {
  return useGetMyProducts(
    userId,
    data => {
      if (states.length === 0) {
        return data;
      } else {
        return data.filter(product => {
          return states.some(state => state === product.extra.state);
        });
      }
    },
    keyword,
  );
};
