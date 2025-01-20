import Button from "@components/Button";
import Star from "@pages/myPage/Star";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

MyReviewList.propTypes = {
  item: PropTypes.object,
  partTime: PropTypes.object,
};
const alertfun = () => {
  alert("신고되었습니다");
};
export default function MyReviewList({ item, partTime }) {
  // console.log("사장일때 받은 리뷰", item);

  console.log("알바생일때", partTime);

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
                        ? reply.user.image.includes("kakaocdn.net")
                          ? reply.user.image
                          : `https://11.fesp.shop/${reply.user.image}`
                        : "/images/smiling_daeddamon.png"
                    }
                    alt="사용자 이미지"
                    className="size-10 rounded-full"
                  />
                </Link>
                <Link to={`/post/${item._id}`} className="w-full">
                  <div className="max-w-[440px]">
                    <p className="font-bold text-sm">{reply.user.name}</p>
                    <Star reply={reply} />
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
        {partTime.extra.contents.map(item => (
          <div key={partTime._id} className="reviews-container">
            <div className="flex gap-1 ">
              <div className="flex gap-5 flex-grow">
                <Link
                  to={`/user/${partTime.user._id}`}
                  className="flex-shrink-0"
                >
                  <img
                    src={
                      partTime.user.image
                        ? partTime.user.image.includes("kakaocdn.net")
                          ? partTime.user.image
                          : `https://11.fesp.shop/${partTime.user.image}`
                        : "/images/smiling_daeddamon.png"
                    }
                    alt="사용자 이미지"
                    className="size-10 rounded-full"
                  />
                </Link>
                <Link to={`/post/${partTime.user._id}`} className="w-full">
                  <div className="max-w-[440px]">
                    <p className="font-bold text-sm">{partTime.user.name}</p>
                    <div className="flex">
                      <div className="flex gap-1 size-3 mb-2">
                        <Star className="flex" partTime={partTime} />
                      </div>
                    </div>

                    <p className=" whitespace-normal break-words  text-sm">
                      {item.memo}
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
  }
}
