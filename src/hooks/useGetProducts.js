import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getWorkTime } from "@/utills/func";

export const useGetProducts = (keyword, select) => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["products"],
    queryFn: () => {
      return axios.get(`/products/?keyword=${keyword}`);
    },
    select: res => {
      return select ? select(res.data.item) : res.data.item;
    },
    staleTime: 1000 * 10,
    enabled: true,
  });
};

// condition
// {
//     worktime: "all",
//     payment: "all",
//   }
export const useProductsFilter = (keyword, condition) => {
  return useGetProducts(keyword, data => {
    let result = [...data];

    // 필터 로직
    // wortime
    if (condition.worktime === "short") {
      result = result.filter(data => {
        return (
          getWorkTime(
            data.extra.condition.workTime[0],
            data.extra.condition.workTime[1],
          ) <= 4
        );
      });
    } else if (condition.worktime === "normal") {
      result = result.filter(data => {
        return (
          getWorkTime(
            data.extra.condition.workTime[0],
            data.extra.condition.workTime[1],
          ) <= 8
        );
      });
    } else if (condition.worktime === "long") {
      result = result.filter(data => {
        return (
          getWorkTime(
            data.extra.condition.workTime[0],
            data.extra.condition.workTime[1],
          ) > 8
        );
      });
    }

    // price
    if (condition.payment === "low") {
      result = result.filter(data => {
        return (
          data.price /
            getWorkTime(
              data.extra.condition.workTime[0],
              data.extra.condition.workTime[1],
            ) <
          10000
        );
      });
    } else if (condition.payment === "high") {
      result = result.filter(data => {
        return (
          data.price /
            getWorkTime(
              data.extra.condition.workTime[0],
              data.extra.condition.workTime[1],
            ) >=
          10000
        );
      });
    }
    return result;
  });
};
