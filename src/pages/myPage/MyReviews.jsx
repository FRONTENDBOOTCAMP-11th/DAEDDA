import useAxiosInstance from "@hooks/useAxiosInstance";
import MyReviewList from "@pages/myPage/MyReviewList";
import { useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useParams } from "react-router-dom";
import { useStore } from "zustand";

export default function MyReviews() {
  const axios = useAxiosInstance();

  // const { _id } = useParams();
  const { user } = useUserStore();
  const { data } = useQuery({
    queryKey: ["reviews"],
    //일단 뿌리기 작업 test를 위해 seller 아이디를 2로 하드코딩, 이후에 로그인 작업이 완료되면 세션스토리지에서 id꺼내 올 예정
    queryFn: () => axios.get(`/replies/seller/${user._id}`),
    select: res => res.data,
    staleTime: 1000 * 10,
  });
  if (!data) {
    return <div>로딩중</div>;
  }
  console.log(data);
  // 댓글 수 계산
  let totalReplies = 0;
  data.item.forEach(item => (totalReplies += item.replies.length));

  const list = data.item.map(item => (
    <MyReviewList key={item._id} item={item} />
  ));
  return (
    <div className="mb-[40px]">
      <p className="font-bold text-[18px] pb-8 px-5">리뷰 {totalReplies}개</p>
      {list}
    </div>
  );
}
