import useAxiosInstance from "@hooks/useAxiosInstance";
import LikeList from "@pages/myPage/LikeList";
import { useQuery } from "@tanstack/react-query";
import { PulseLoader } from "react-spinners";

export default function Likes() {
  const axios = useAxiosInstance();
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => axios.get("/bookmarks/product"),
    select: res => res.data.item,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-32">
        <PulseLoader color={"#8C6FEE"} />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="-mt-[80px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
        관심 표시한 글이 없어요.
        <br /> 공고 리스트에 올라온 글을 탐색하고 <br />
        관심 표시를 해보세요!
      </div>
    );
  }
  // console.log(data);
  const list = data.map(item => <LikeList key={item._id} item={item} />);
  return <div className="mb-[80px] mt-[10px]">{list}</div>;
}
