import useAxiosInstance from "@hooks/useAxiosInstance";
import ListItem from "@pages/main/ListItem";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MainList() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const axios = useAxiosInstance();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await axios.get("/products");
      setData(res.data.item);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(data);
  return (
    <div className="mb-[80px] flex flex-col">
      <div className="flex justify-between items-center text-[24px] font-semibold pb-[23px]">
        <p>동래구 중앙대로 1473번길 14-2</p>
        <div className="flex gap-4 screen-530:hidden">
          <img src="/icons/search.svg" />
          <img src="/icons/mapPin.svg" />
        </div>
      </div>

      <div className="py-[14px] flex gap-4 mb-5 flex-wrap">
        <div>
          <label htmlFor="time" className="mr-[16px] font-[700] ">
            시간
          </label>
          <select className="ring-2 ring-gray-400 focus:ring-primary py-[9px] px-3 rounded-xl">
            <option>0 ~ 4시간</option>
            <option>4 ~ 10시간</option>
            <option>10시간 이상</option>
          </select>
        </div>
        <div>
          <label htmlFor="time" className="mr-[16px] font-[700] ">
            급여
          </label>
          <select className="ring-2 ring-gray-400 focus:ring-primary py-[9px] px-3 rounded-xl">
            <option>시급 10,000원 이하</option>
            <option>시급 10,000원 이상</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {isLoading && <p>로딩중...</p>}
        {data && (
          <>
            <ListItem data={data[0]} />
            <ListItem data={data[1]} />
          </>
        )}
      </div>

      <Link
        to="main/write"
        className="bottom-[80px] fixed self-end size-20 bg-primary text-white rounded-full flex justify-center items-center shadow-md"
      >
        <img src="/icons/whitePlus.svg" />
      </Link>
    </div>
  );
}
