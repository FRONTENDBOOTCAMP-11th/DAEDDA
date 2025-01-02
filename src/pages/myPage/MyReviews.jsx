import useAxiosInstance from "@hooks/useAxiosInstance";
import MyReviewList from "@pages/myPage/MyReviewList";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function MyReviews() {
  const axios = useAxiosInstance();
  const { _id } = useParams();
  const { data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => axios.get(`/replies/seller/${_id}`),
    select: res => res.data,
    staleTime: 1000 * 10,
  });
  if (!data) {
    return <div>로딩중</div>;
  }
  // 댓글 수 계산
  let totalReplies = 0;
  data.item.forEach(item => (totalReplies += item.replies.length));
  // console.log(totalReplies);
  console.log(data.item);

  const list = data.item.map(item => (
    <MyReviewList key={item._id} item={item} />
  ));
  return (
    <div className="mb-[40px]">
      <p className="font-bold text-[18px] pb-8 px-5">리뷰 {totalReplies}개</p>
      {list}
      {/* 
      <div className="reviews-container">
        <div className="flex gap-1 ">
          <div className="flex gap-5">
            <img
              src="/src/assets/images/smiling_daeddamon.png"
              alt=""
              className="size-10"
            />
            <div className="max-w-[440px]">
              <p className="font-bold">리뷰 쓴 사람</p>
              <div className="flex gap-1 size-3 mb-2">
                <img src="/icons/reviews/star.svg" />
                <img src="/icons/reviews/star.svg" />
                <img src="/icons/reviews/star.svg" />
                <img src="/icons/reviews/star.svg" />
                <img src="/icons/reviews/blankStar.svg" />
              </div>
              <p className="break-keep whitespace-normal text-sm">
                이번에 대타로 와주신 김지원 님에 대한 리뷰를 남깁니다. 지원님은
                연락이 정말 빠르고 정확하게 이루어졌습니다. 처음 대타 요청에
                응답해 주실 때부터 친절하게 자신의 경력과 가능 여부를 상세히
                설명해 주셔서 신뢰가 갔습니다. 정리하자면, 지원 님은 성실함,
                책임감, 그리고 친절함까지 모두 갖춘 알바생이었습니다. 다시 한 번
                감사드리며, 다음에도 기회가 된다면 꼭 함께 일하고 싶습니다! 😊
              </p>
            </div>
          </div>

          <Button height="xs" color="white" className="w-[47px] shrink-0">
            신고하기
          </Button>
        </div>
      </div> */}
    </div>
  );
}
