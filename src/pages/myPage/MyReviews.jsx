import Button from "@components/Button";
import { useProfileData } from "@hooks/useProfileData";
import MyReviewListItem from "@pages/myPage/MyReviewListItem";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

export default function MyReviews() {
  const userId = location.pathname.split("/")[3];

  const [btnTxt, setBtnTxt] = useState("사장");
  const hireBtn = () => {
    setBtnTxt(btnTxt === "사장" ? "알바" : "사장");
  };

  const { reviews, partTime, isLoading } = useProfileData(userId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-48">
        <PulseLoader color={"#8C6FEE"} />
      </div>
    );
  }

  let totalReplies = 0;
  reviews.forEach(item => (totalReplies += item.replies.length));

  let partTimeTotalRp = 0;
  if (partTime.byUser) {
    partTime.byUser.forEach(user => {
      if (user.extra && Array.isArray(user.extra.contents)) {
        partTimeTotalRp += user.extra.contents.length;
      }
    });
  }

  let reviewList = [];
  if (btnTxt === "알바") {
    partTime?.byUser.map(byUser => {
      const byUserContent = byUser.extra.contents.map(content => ({
        ...byUser,
        content,
        _id: byUser.product_id,
      }));
      reviewList = [...reviewList, ...byUserContent];
    });
  } else {
    reviews?.map(replies => {
      const repliesContents = replies?.replies.map(content => ({
        content: {
          ...content,
          memo: content.content,
        },
        user: content.user, //user데이터 바깥으로 뻄
        _id: replies.product_id,
      }));
      reviewList = [...reviewList, ...repliesContents];
    });
  }

  // console.log(reviews);
  console.log(partTime);

  // console.log(reviewList);

  const myReviewList = reviewList.map((review, i) => (
    <MyReviewListItem key={i} review={review} />
  ));

  return (
    <div className="mb-[40px]">
      <div className="flex  px-5 pb-5">
        <p className="font-bold text-[1.125rem] flex-grow ">
          {btnTxt === "사장"
            ? `리뷰 ${totalReplies}개`
            : `리뷰 ${partTimeTotalRp}개`}
        </p>
        <Button color="purple" className="w-14" onClick={hireBtn} height="sm">
          {btnTxt}
        </Button>
      </div>

      {btnTxt === "사장" && totalReplies === 0 ? (
        <div className="py-10 -mb-[70px] -mt-[140px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
          리뷰가 없습니다. 글을 등록해주세요!
        </div>
      ) : btnTxt === "알바" && partTimeTotalRp === 0 ? (
        <div className="py-10 -mb-[70px] -mt-[140px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
          리뷰가 없습니다. 글을 등록해주세요!
        </div>
      ) : (
        // 리뷰 리스트 렌더링
        <div>{myReviewList}</div>
      )}
    </div>
  );
}
