import InputField from "@components/layout/InputField";
import { useGetOrders } from "@hooks/useGetOrders";
import MyPlaceItem from "@pages/reviews/MyPlaceItem";

// 구매 회원 id = 2로 샘플 데이터 채움

export default function ReviewWrite() {
  const { data, isLoading } = useGetOrders("employer");

  return (
    <div>
      <InputField
        placeholder="나 대신 일하는 사람을 검색해보세요."
        isLast={true}
      />
      <div className="flex gap-4 mt-4 flex-wrap mb-5">
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          구인 중
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
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
      {data && data.map(order => <MyPlaceItem key={order._id} data={order} />)}
    </div>
  );
}
