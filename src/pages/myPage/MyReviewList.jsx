import Button from "@components/layout/Button";

export default function MyReviewList({ item }) {
  if (!item) {
    return <div>데이터가 없습니다.</div>;
  }

  // console.log(item);
  return (
    <>
      {item.replies.map(reply => (
        <div key={reply._id} className="reviews-container">
          <div className="flex gap-1 ">
            <div className="flex gap-5">
              <img
                src="/src/assets/images/smiling_daeddamon.png"
                alt=""
                className="size-10"
              />
              <div className="max-w-[440px]">
                <p className="font-bold">{reply.user_name}</p>
                <div className="flex gap-1 size-3 mb-2">
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/blankStar.svg" />
                </div>
                <p className="break-keep whitespace-normal text-sm">
                  {reply.content}
                </p>
              </div>
            </div>

            <Button
              height="xs"
              color="white"
              className="w-[47px] shrink-0 ml-auto"
            >
              신고하기
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
