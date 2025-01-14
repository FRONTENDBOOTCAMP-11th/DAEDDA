import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/main/ListItem";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function MainList() {
  const axios = useAxiosInstance();

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axios.get("/products"),
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });

  return (
    <div className="mb-[80px] flex flex-col">
      <div className="flex gap-2 items-center text-[18px] font-semibold mb-4">
        <p>동래구 중앙대로 1473번길 14-2</p>
        <img src="/icons/mapPin.svg" className="size-[18px]" />
      </div>

      <form className="mb-4">
        <div className="relative">
          <input
            className="w-full ring-2 ring-primary rounded-2xl py-2 pl-3 pr-[36px] re"
            type="text"
            placeholder="관심있는 대타 장소를 검색해보세요."
          />
          <img
            src="/icons/search.svg"
            className="absolute right-[8px] top-1/2 -translate-y-1/2"
          />
        </div>
      </form>

      <div className="flex gap-4 mb-5 flex-wrap">
        <div>
          <label
            htmlFor="time"
            className="mr-[16px] font-[700] screen-530:text-[14px] screen-530:mr-[8px]"
          >
            시간
          </label>
          <select className="ring-2 ring-gray-400 focus:ring-primary py-2 px-3 rounded-xl screen-530:py-[6px]">
            <option className="text-[14px]">0 ~ 4시간</option>
            <option className="text-[14px]">4 ~ 10시간</option>
            <option className="text-[14px]">10시간 이상</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="time"
            className="mr-[16px] font-[700] screen-530:text-[14px] screen-530:mr-[8px]"
          >
            시급
          </label>
          <select className="ring-2 ring-gray-400 focus:ring-primary py-2 px-3 rounded-xl screen-530:py-[6px]">
            <option className="text-[14px]">10,000원 이하</option>
            <option className="text-[14px]">10,000원 이상</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {isLoading && <p>로딩중...</p>}
        {data && (
          <>
            <ListItem data={data[0]} />
            <ListItem data={data[1]} />
            <ListItem data={data[2]} />
          </>
        )}
      </div>

      <Link
        to="main/write"
        className="bottom-[76px] fixed self-end size-16 bg-primary text-white rounded-full flex justify-center items-center shadow-md"
      >
        <img src="/icons/whitePlus.svg" />
      </Link>
    </div>
  );
}
