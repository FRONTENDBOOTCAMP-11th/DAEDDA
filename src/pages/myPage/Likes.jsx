import useAxiosInstance from "@hooks/useAxiosInstance";
import LikeList from "@pages/myPage/LikeList";
import { useQuery } from "@tanstack/react-query";

export default function Likes() {
  const axios = useAxiosInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => axios.get("/bookmarks/product"),
    select: res => res.data.item,
    staleTime: 1000 * 10,
  });
  if (!data) {
    return <div>로딩중</div>;
  }
  // console.log(data);
  const list = data.map(item => <LikeList key={item.id} item={item} />);
  return <div className="mb-[80px]">{list}</div>;
}
