import useAxiosInstance from "@hooks/useAxiosInstance";
import LikeList from "@pages/myPage/LikeList";
import { useQuery } from "@tanstack/react-query";

export default function Likes() {
  const axios = useAxiosInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => axios.get("/bookmarks/product"),
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });
  if (!data || data.length === 0) {
    return (
      <div className="-mt-[80px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
        관심 표시한 글이 없어요.
        <br /> 공고 리스트에 올라온 글을 탐색하고 관심 표시를 해보세요!
      </div>
    );
  }
  if (isLoading) {
    return <div>로딩중</div>;
  }
  console.log(data);
  const list = data.map(item => <LikeList key={item.id} item={item} />);
  return <div className="mb-[80px]">{list}</div>;
}
