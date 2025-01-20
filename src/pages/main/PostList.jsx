import { useProductsFilter } from "@hooks/useGetProducts";
import ListItem from "@pages/main/ListItem";
import useUserStore from "@zustand/userStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function PostList() {
  const { register, handleSubmit } = useForm();
  const [keyword, setKeyword] = useState("");
  const { user } = useUserStore();

  const [condition, setCondition] = useState({
    worktime: "all",
    payment: "all",
  });
  const { data, refetch } = useProductsFilter(keyword, condition);

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

  return (
    <div className="mb-[80px] flex flex-col">
      <div className="flex gap-2 items-center text-[1.125rem] font-semibold mb-4">
        <p className="cursor-pointer">동래구 중앙대로 1473번길 14-2</p>
        <img
          src="/icons/mapPin.svg"
          className="size-[1.125rem] cursor-pointer"
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

      <div className="flex gap-4 mb-5 flex-wrap screen-530:justify-center">
        <div>
          <label
            htmlFor="time"
            className="mr-[16px] font-[700] text-[1rem] screen-530:mr-[8px]"
          >
            시간
          </label>
          <select
            className="ring-2 ring-gray-400 focus:ring-primary py-2 px-2 rounded-xl *:text-[14px]"
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
            className="mr-[16px] font-[700] text-[1rem] screen-530:mr-[8px]"
          >
            시급
          </label>
          <select
            className="ring-2 ring-gray-400 focus:ring-primary py-2 px-2 rounded-xl *:text-[14px]"
            onChange={onPaymentFilterChanged}
          >
            <option value="all">모든 시급</option>
            <option value="low">10,000원 이하</option>
            <option value="high">10,000원 이상</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {data && (
          <>
            {data.map(data => {
              console.log(data.extra.state);
              if (data.extra.state === "EM030" || data.extra.state === "EM040")
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
