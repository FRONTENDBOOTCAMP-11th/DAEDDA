import InputField from "@components/layout/InputField";
import { useGetOrders } from "@hooks/useGetOrders";
import MyPlaceItem from "@pages/reviews/MyPlaceItem";

// 구매 회원 id = 4로 샘플 데이터 채움

export default function ReviewWrite() {
  const { data, isLoading } = useGetOrders("worker");

  return (
    <div>
      <InputField
        placeholder="내가 일하는 장소를 검색해보세요."
        isLast={true}
      />

      <div className="flex gap-4 mt-4 flex-wrap mb-5">
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          신청 완료
        </div>
        <div className="ring-1 ring-gray-200  text-gray-400  px-4 py-2 rounded-xl">
          채택 완료
        </div>
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          대타 완료
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          입금 완료
        </div>
      </div>
      {isLoading && "로딩중..."}
      {data && data.map(order => <MyPlaceItem key={order._id} data={order} />)}
    </div>
  );
}
