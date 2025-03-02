import { useProductsFilter } from "@hooks/useGetProducts";
import ListItem from "@pages/main/ListItem";
import { useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function PostList() {
  const { user } = useUserStore();
  const { register, handleSubmit } = useForm();

  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const [condition, setCondition] = useState({
    worktime: "all",
    payment: "all",
  });

  /* 근처 게시글 필터 버튼 */
  const [distanceInfo, setDistanceInfo] = useState({
    position: { x: 0, y: 0 },
    selected: "all",
  });

  const { data, refetch, isLoading, hasMore } = useProductsFilter(
    keyword,
    condition,
    distanceInfo,
    page,
    limit,
  );
  const onWorktimeFilterChanged = e => {
    setCondition(prev => {
      const temp = { ...prev, worktime: e.target.value };
      return temp;
    });
  };

  const onPaymentFilterChanged = e => {
    setCondition(prev => {
      const temp = { ...prev, payment: e.target.value };
      return temp;
    });
  };

  const onSearchSubmit = formData => {
    setKeyword(formData.keyword);
  };

  useEffect(() => {
    refetch();
  }, [keyword]);

  /* 현재 위치에대한 주소 표시 */

  // 테스트 코드
  // console.log(distanceInfo);

  const [location, setLocation] = useState({
    address: "현재 위치 검색을 눌러주세요.",
  });

  const handleLocationChange = () => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const x = position.coords.latitude + "";
        const y = position.coords.longitude + "";
        setDistanceInfo(prev => ({ ...prev, position: { x, y } }));

        try {
          const res = await axios.get(
            "https://dapi.kakao.com/v2/local/geo/coord2address.json",
            {
              params: {
                x,
                y,
              },
              headers: {
                Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
              },
            },
          );

          if (res.data.documents.length > 0) {
            setLocation({
              x,
              y,
              address: res.data.documents[0].address.address_name,
            });
          } else {
            setLocation({
              address: "현재 위치의 주소를 표시할 수 없습니다.",
            });
          }
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      },
      error => {
        console.error("Geolocation error:", error);
      },
    );
  };

  /* 무한 스크롤 */
  const lastItemRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setPage(prevPage => prevPage + 1);
        }
      },
      { threshold: 1.0 },
    );

    if (lastItemRef.current) observerRef.current.observe(lastItemRef.current);
  }, [data, hasMore, isLoading]);

  const queryClient = useQueryClient();

  useEffect(() => {
    setPage(1);
    queryClient.invalidateQueries({
      predicate: query => query.queryKey[0] === "products",
    });
    refetch();
  }, [keyword, condition, distanceInfo]);

  return (
    <div className="mb-[80px] flex flex-col">
      <div className="mb-4 flex justify-between screen-530:flex-wrap">
        <div className="flex gap-2 items-center screen-530:mb-4">
          <p className="text-[18px] font-semibold">{location.address}</p>
          <img
            src="/icons/mapPin.svg"
            className="size-[18px] cursor-pointer mr-4"
            onClick={handleLocationChange}
          />
        </div>
        <div className="flex items-center gap-4">
          <div
            className={`w-20 ring-2 rounded-xl flex justify-center items-center h-9 text-[14px] cursor-pointer ${
              distanceInfo.selected === "3km" ? "ring-primary" : "ring-gray-400"
            }`}
            onClick={() =>
              setDistanceInfo(prev => ({ ...prev, selected: "3km" }))
            }
          >
            3km 이내
          </div>
          <div
            className={`w-20 ring-2 rounded-xl flex justify-center items-center h-9 text-[14px] cursor-pointer ${
              distanceInfo.selected === "10km"
                ? "ring-primary"
                : "ring-gray-400"
            }`}
            onClick={() =>
              setDistanceInfo(prev => ({ ...prev, selected: "10km" }))
            }
          >
            10km 이내
          </div>
          <div
            className={`w-20 ring-2 rounded-xl flex justify-center items-center h-9 text-[14px] cursor-pointer ${
              distanceInfo.selected === "all" ? "ring-primary" : "ring-gray-400"
            }`}
            onClick={() =>
              setDistanceInfo(prev => ({ ...prev, selected: "all" }))
            }
          >
            전체 보기
          </div>
        </div>
      </div>
      <form className="mb-5" onSubmit={handleSubmit(onSearchSubmit)}>
        <div className="relative">
          <input
            {...register("keyword")}
            className="w-full ring-2 ring-primary rounded-2xl py-2 pl-3 pr-[36px]"
            type="text"
            placeholder="관심있는 대타 장소를 검색해보세요."
          />
          <button type="submit">
            <img
              src="/icons/search.svg"
              className="absolute right-[8px] top-1/2 -translate-y-1/2 size-5"
            />
          </button>
        </div>
      </form>
      <div className="flex gap-4 mb-5 flex-wrap screen-530:justify-center screen-530:gap-2">
        <div>
          <label
            htmlFor="time"
            className="mr-[16px] font-[700] text-[1rem] screen-530:mr-[6px]"
          >
            근무 시간
          </label>
          <select
            className="ring-2 ring-gray-400 focus:ring-primary py-2 px-1 rounded-xl *:text-[12px]"
            onChange={onWorktimeFilterChanged}
          >
            <option value="all">모든 시간</option>
            <option value="short">0 ~ 4시간</option>
            <option value="normal">4 ~ 8시간</option>
            <option value="long">8시간 초과</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="time"
            className="mr-[16px] font-[700] text-[1rem] screen-530:mr-[6px]"
          >
            시급
          </label>
          <select
            className="ring-2 ring-gray-400 focus:ring-primary py-2 px-1 rounded-xl *:text-[12px]"
            onChange={onPaymentFilterChanged}
          >
            <option value="all">모든 시급</option>
            <option value="low">10,000원 이하</option>
            <option value="high">10,000원 이상</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {isLoading && (
          <div className="flex justify-center items-center mt-32">
            <PulseLoader color={"#8C6FEE"} />
          </div>
        )}
        {data && (
          <>
            {data.map((post, index) => {
              return (
                <ListItem
                  key={post._id}
                  data={post}
                  ref={index === data.length - 1 ? lastItemRef : null}
                />
              );
            })}
          </>
        )}
      </div>
      {user && (
        <Link
          to="post/write"
          className="bottom-[76px] fixed self-end size-16 bg-primary text-white rounded-full flex justify-center items-center shadow-md"
        >
          <img src="/icons/whitePlus.svg" />
        </Link>
      )}
    </div>
  );
}
