import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = (select, keyword) => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["orders"],
    queryFn: () => {
      return axios.get("/orders", { params: { keyword } });
    },
    select: res => {
      return select ? select(res.data.item) : res.data.item;
    },
    staleTime: 1000 * 10,
  });
};

export const useOrdersFilter = (states, keyword) => {
  return useGetOrders(data => {
    if (states.length === 0) return data;
    else
      return data.filter(order => states.some(state => state === order.state));
  }, keyword);
};
