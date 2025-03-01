import useAxiosInstance from "@hooks/useAxiosInstance";
import {
  defaultShouldDehydrateMutation,
  useQuery,
} from "@tanstack/react-query";
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
export const useProductsFilter = (keyword, condition, distanceInfo) => {
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

    // distance
    if (
      distanceInfo.position.x !== 0 &&
      distanceInfo.position.y !== 0 &&
      distanceInfo.selected !== "all"
    ) {
      if (distanceInfo.selected === "3km") {
        const minLat = +distanceInfo.position.y - 0.03;
        const maxLat = +distanceInfo.position.y + 0.03;
        const minLng = +distanceInfo.position.x - 0.03;
        const maxLng = +distanceInfo.position.x + 0.03;

        result = result.filter(data => {
          if (data.extra.location) {
            return (
              data.extra.location[1] >= minLat &&
              data.extra.location[1] <= maxLat &&
              data.extra.location[0] >= minLng &&
              data.extra.location[0] <= maxLng
            );
          }
        });
      } else if (distanceInfo.selected === "10km") {
        const minLat = +distanceInfo.position.y - 0.1;
        const maxLat = +distanceInfo.position.y + 0.1;
        const minLng = +distanceInfo.position.x - 0.1;
        const maxLng = +distanceInfo.position.x + 0.1;

        result = result.filter(data => {
          if (data.extra.location) {
            return (
              data.extra.location[1] >= minLat &&
              data.extra.location[1] <= maxLat &&
              data.extra.location[0] >= minLng &&
              data.extra.location[0] <= maxLng
            );
          }
        });
      }
    }
    return result;
  });
};
