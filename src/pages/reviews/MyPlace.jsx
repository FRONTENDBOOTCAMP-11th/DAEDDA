import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import MyPlaceItem from "@pages/reviews/MyPlaceItem";
import { useQuery } from "@tanstack/react-query";

export default function ReviewWrite() {
  const axios = useAxiosInstance();

  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axios.get("/products"),
    select: res => {
      const items = res.data.item;
      return items.filter(item => item.extra.applied_id?.includes(4));
    },
    staleTime: 1000 * 10,
  });

  return (
    <div>
      <InputField
        placeholder="내가 일하는 장소를 검색해보세요."
        isLast={true}
      />

      <div className="flex gap-4 mt-4 flex-wrap mb-5">
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          구인 중
        </div>
        <div className="ring-1 ring-gray-200  text-gray-400  px-4 py-2 rounded-xl">
          구인 완료
        </div>
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          대타 완료
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          송금 완료
        </div>
      </div>
      {isLoading && "로딩중..."}
      {data && (
        <>
          {data.map(el => {
            return <MyPlaceItem key={el._id} data={el} />;
          })}
        </>
      )}
    </div>
  );
}
