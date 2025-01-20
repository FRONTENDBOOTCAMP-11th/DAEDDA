import Button from "@components/Button";
import Star from "@pages/myPage/Star";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

MyReviewListItem.propTypes = {
  review: PropTypes.object,
};
const alertfun = () => {
  alert("신고되었습니다");
};
export default function MyReviewListItem({ review }) {
  //   console.log(review);
  return (
    <>
      <div className="reviews-container">
        <div className="flex gap-1 ">
          <div className="flex gap-5 flex-grow">
            <Link to={`/user/${review.user._id}`} className="flex-shrink-0">
              <img
                src={
                  review.user.image
                    ? review.user.image.includes("kakaocdn.net")
                      ? review.user.image
                      : `https://11.fesp.shop/${review.user.image}`
                    : "/images/smiling_daeddamon.png"
                }
                alt="사용자 이미지"
                className="size-10 rounded-full"
              />
            </Link>
            <Link to={`/post/${review._id}`} className="w-full">
              <div className="max-w-[440px]">
                <p className="font-bold text-sm">{review.user.name}</p>
                <div className="flex gap-1 size-3 mb-1">
                  <Star rating={review.content.rating} />
                </div>
                <p className="break-all whitespace-normal text-sm">
                  {review.content.memo}
                </p>
              </div>
            </Link>
          </div>

          <Button
            height="xs"
            color="white"
            className="w-[47px] shrink-0"
            onClick={alertfun}
          >
            신고하기
          </Button>
        </div>
      </div>
    </>
  );
}
