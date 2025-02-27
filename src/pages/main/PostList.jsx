import { useProductsFilter } from "@hooks/useGetProducts";
import ListItem from "@pages/main/ListItem";
import useUserStore from "@zustand/userStore";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

export default function PostList() {
  const { register, handleSubmit } = useForm();
  const [keyword, setKeyword] = useState("");
  const { user } = useUserStore();

  const [condition, setCondition] = useState({
    worktime: "all",
    payment: "all",
  });
  const { data, refetch, isLoading } = useProductsFilter(keyword, condition);

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
  const [location, setLocation] = useState({
    x: 126.945134750779,
    y: 37.5118104872992,
    address: "서울특별시 동작구 만양로14가길 3",
  });

  const handleLocationChange = () => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const x = position.coords.latitude + "";
        const y = position.coords.longitude + "";
        try {
          const res = await axios.get(
            "https://dapi.kakao.com/v2/local/geo/coord2address.json",
            {
              params: {
                x: 126.945134750779,
                y: 37.5118104872992,
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

  return (
    <div className="mb-[80px] flex flex-col">
      <div className="mb-4 text-[18px] font-semibold flex gap-2 items-center">
        <p>{location.address}</p>
        <img
          src="/icons/mapPin.svg"
          className="size-[18px] cursor-pointer"
          onClick={handleLocationChange}
        />
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
            {data.map(data => {
              // 날짜가 지난 구인글인 경우
              if (new Date(data.extra.condition.date) < new Date()) return null;
              // 입금 완료되거나 리뷰가 작성된 구인글인 경우
              else if (
                data.extra.state === "EM030" ||
                data.extra.state === "EM040"
              )
                return null;
              else return <ListItem key={data._id} data={data} />;
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
