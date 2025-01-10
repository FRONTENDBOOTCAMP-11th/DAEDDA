import Button from "@components/layout/Button";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";

MyReviewList.propTypes = {
  item: PropTypes.object,
  partTime: PropTypes.object,
};
const alertfun = () => {
  alert("신고되었습니다");
};
export default function MyReviewList({ item, partTime }) {
  // const { _id } = useParams();

  // if (!item || !partTime) {
  //   return <div>데이터가 없습니다.</div>;
  // }
  // console.log(item);
  // console.log(item._id);
  // console.log("파트타타타타임", partTime);

  if (item) {
    return (
      <>
        {item.replies.map(reply => (
          <div key={reply._id} className="reviews-container">
            <div className="flex gap-1 ">
              <div className="flex gap-5 flex-grow">
                <Link to={`/user/${reply.user._id}`} className="flex-shrink-0">
                  <img
                    src={
                      reply.user.image
                        ? `https://11.fesp.shop/${reply.user.image}`
                        : `/images/smiling_daeddamon.png`
                    }
                    alt="사용자 이미지"
                    className="size-10"
                  />
                </Link>
                <Link to={`/main/${item._id}`} className="w-full">
                  <div className="max-w-[440px]">
                    <p className="font-bold text-sm">{reply.user.name}</p>
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
                className="w-[47px] shrink-0"
                onClick={alertfun}
              >
                신고하기
              </Button>
            </div>
          </div>
        ))}
      </>
    );
  } else {
    return (
      <>
        <div key={partTime.user_id} className="reviews-container">
          <div className="flex gap-1 ">
            <div className="flex gap-5 flex-grow">
              <Link to={`/user/${partTime.user_id}`} className="flex-shrink-0">
                <img
                  src={
                    partTime.image
                      ? `https://11.fesp.shop/${partTime.image}`
                      : `/images/smiling_daeddamon.png`
                  }
                  alt="사용자 이미지"
                  className="size-10"
                />
              </Link>
              <Link to={`/main/${partTime.user_id}`} className="w-full">
                <div className="max-w-[440px]">
                  <p className="font-bold text-sm">{partTime.name}</p>
                  <div className="flex gap-1 size-3 mb-2">
                    <img src="/icons/reviews/star.svg" />
                    <img src="/icons/reviews/star.svg" />
                    <img src="/icons/reviews/star.svg" />
                    <img src="/icons/reviews/star.svg" />
                    <img src="/icons/reviews/blankStar.svg" />
                  </div>
                  <p className="break-keep whitespace-normal text-sm">
                    일단하드코딩
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
}
