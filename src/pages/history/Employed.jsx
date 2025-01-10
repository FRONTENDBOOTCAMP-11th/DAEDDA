import InputField from "@components/InputField";
import { useGetPosts } from "@hooks/useGetPosts";
import EmployedItem from "@pages/history/EmployedItem";
import useUserStore from "@zustand/userStore";

export default function Employed() {
  const { user } = useUserStore();

  const { data, refetch } = useGetPosts(user._id);

  console.log(data);
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
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          송금 완료
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          리뷰 작성 완료
        </div>
      </div>
      {data && (
        <>
          <EmployedItem data={data[0]} refetch={refetch} />
          <EmployedItem data={data[1]} refetch={refetch} />
          <EmployedItem data={data[2]} refetch={refetch} />
          <EmployedItem data={data[3]} refetch={refetch} />
        </>
      )}
      {/* {data && data.map(post => <EmployedItem key={post._id} data={post} />)} */}
    </div>
  );
}
