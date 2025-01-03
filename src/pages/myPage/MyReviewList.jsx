import Button from "@components/layout/Button";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

MyReviewList.propTypes = {
  item: PropTypes.node,
};
const alertfun = () => {
  alert("신고되었습니다");
};
export default function MyReviewList({ item }) {
  const { _id } = useParams();

  if (!item) {
    return <div>데이터가 없습니다.</div>;
  }
  console.log(item);
  return (
    <>
      {item.replies.map(reply => (
        <div key={reply._id} className="reviews-container">
          <div className="flex gap-1 ">
            <div className="flex gap-5">
              <Link to={`/user/${_id}`}>
                <img
                  src={
                    reply.image
                      ? `https://11.fesp.shop/${reply.image}`
                      : `/src/asset/images/smiling_daeddamon.png`
                  }
                  alt="사용자 이미지"
                  className="size-10"
                />
              </Link>
              <Link to={`/main/${_id}`}>
                <div className="max-w-[440px]">
                  <p className="font-bold text-sm">{reply.user_name}</p>
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
              </Link>
            </div>

            <Button
              height="xs"
              color="white"
              className="w-[47px] shrink-0 ml-auto"
              onClick={alertfun}
            >
              신고하기
            </Button>
          </div>
        </div>
      ))}
    </>
  );
}
