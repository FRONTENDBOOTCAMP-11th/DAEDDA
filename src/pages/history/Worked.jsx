import InputField from "@components/InputField";
import { useGetOrders } from "@hooks/useGetOrders";
import WorkedItem from "@pages/history/WorkedItem";

export default function Worked() {
  const { data, refetch } = useGetOrders();

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
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          입금 완료
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          리뷰 작성 완료
        </div>
      </div>
      {data &&
        data.map(order => (
          <WorkedItem key={order._id} data={order} refetch={refetch} />
        ))}
    </div>
  );
}
