import InputField from "@components/layout/InputField";
import { useGetUser } from "@hooks/useGetUser";
import MyPlaceItem from "@pages/reviews/MyPlaceItem";

export default function ReviewWrite() {
  const { data, isLoading } = useGetUser(4);

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
          수금 완료
        </div>
      </div>
      {isLoading && "로딩중..."}
      {data &&
        data[0].extra.appliedPlace.map(el => {
          return (
            <MyPlaceItem key={el._id} postId={el._id} userState={el.state} />
          );
        })}
    </div>
  );
}
