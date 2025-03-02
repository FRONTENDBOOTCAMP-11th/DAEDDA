import useAxiosInstance from "@hooks/useAxiosInstance";
import { useQuery } from "@tanstack/react-query";
import { getWorkTime } from "@/utills/func";
import { useEffect, useState } from "react";

export const useGetProducts = (keyword, page, limit, select) => {
  const axios = useAxiosInstance();

  return useQuery({
    queryKey: ["products", keyword, page],
    queryFn: () => {
      return axios.get(
        `/products/?keyword=${keyword}&page=${page}&limit=${limit}`,
      );
    },
    select: res => {
      const { item } = res.data;
      const totalCount = res.data.pagination?.total || 0;
      return select ? select({ item, totalCount }) : { item, totalCount };
    },
    staleTime: 1000 * 10,
    enabled: true,
  });
};

export const useProductsFilter = (
  keyword,
  condition,
  distanceInfo,
  page,
  limit,
) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const {
    data: fetchedData,
    isLoading,
    refetch,
  } = useGetProducts(keyword, page, limit, ({ item, totalCount }) => {
    let result = [...item];

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
    return { item: result, totalCount };
  });

  useEffect(() => {
    if (fetchedData) {
      const { item, totalCount } = fetchedData;
      setHasMore(page * limit < totalCount);

      if (page === 1) {
        setData(item);
      } else {
        setData(prevData => [...prevData, ...item]);
      }
    }
  }, [fetchedData, page]);
  return { data, isLoading, hasMore, refetch };
};
