import Button from "@components/Button";
import { useProfileData } from "@hooks/useProfileData";
import MyBossReviewListItem from "@pages/myPage/MyBossReviewListItem";
import MyReviewListItem from "@pages/myPage/MyReviewListItem";
import { useState } from "react";

export default function MyReviews() {
  const userId = location.pathname.split("/")[3];

  const [btnTxt, setBtnTxt] = useState("사장");
  const hireBtn = () => {
    setBtnTxt(btnTxt === "사장" ? "알바" : "사장");
  };

  const { reviews, partTime, isLoading } = useProfileData(userId);

  // console.log(reviews);

  if (isLoading) {
    return <div>로딩중</div>;
  }

  let totalReplies = 0;
  reviews.forEach(item => (totalReplies += item.replies.length));
  // const partTimeTotalRp = partTime.byUser.length;

  let partTimeTotalRp = 0;
  if (partTime.byUser) {
    partTime.byUser.forEach(user => {
      // `byUser` 배열 하나를 기본으로 1 추가
      // partTimeTotalRp += 1;
      // `extra.content` 배열의 길이를 가져와 추가
      if (user.extra && Array.isArray(user.extra.contents)) {
        partTimeTotalRp += user.extra.contents.length;
      }
    });
  }

  let reviewList = [];

  // if (btnTxt === "알바") {
  //   partTime?.byUser.map(byUser => {
  //     const byUserContent = byUser.extra.contents.map(content => ({
  //       ...byUser,
  //       content,
  //     }));
  //     reviewList = [...reviewList, ...byUserContent];
  //   });
  // } else {
  //   reviewList = reviews.map(item => ({
  //     // ...byUser,
  //   }));
  // }

  const list = reviews.map(item => (
    <MyBossReviewListItem key={item._id} item={item} btnTxt={btnTxt} />
  ));

  partTime?.byUser.map(byUser => {
    const byUserContent = byUser.extra.contents.map(content => ({
      ...byUser,
      content,
    }));
    reviewList = [...reviewList, ...byUserContent];
  });
  // console.log(reviewList);

  const myReviewList = reviewList.map(review => (
    <MyReviewListItem key={review._id} review={review} />
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
      {/* {totalReplies === 0 || partTimeTotalRp === 0 ? (
        <div className="py-10 -mb-[80px] -mt-[140px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
          받은 리뷰가 없어요.
          <br />
          공고 리스트를 탐색하고 다양한 알바를 지원해보세요!
        </div>
      ) : (
        <div> {btnTxt === "사장" ? list : myReviewList}</div>
      )} */}

      {btnTxt === "사장" && totalReplies === 0 ? (
        <div className="py-10 -mb-[80px] -mt-[140px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
          받은 리뷰가 없어요.
          <br />
          공고 리스트를 탐색하고 다양한 알바를 지원해보세요!
        </div>
      ) : btnTxt === "알바" && partTimeTotalRp === 0 ? (
        <div className="py-10 -mb-[80px] -mt-[140px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
          받은 리뷰가 없어요.
          <br />
          공고 리스트를 탐색하고 다양한 알바를 지원해보세요!
        </div>
      ) : (
        // 리뷰 리스트 렌더링
        <div>{btnTxt === "사장" ? list : myReviewList}</div>
      )}
    </div>
  );
}

// import Button from "@components/Button";
// import { useProfileData } from "@hooks/useProfileData";
// import MyReviewList from "@pages/myPage/MyReviewList";
// import { useState } from "react";

// export default function MyReviews() {
//   const userId = location.pathname.split("/")[3];
//   // console.log(userId);

//   const [btnTxt, setBtnTxt] = useState("사장");
//   const hireBtn = () => {
//     setBtnTxt(btnTxt === "사장" ? "알바" : "사장");
//   };

//   const { reviews, partTime, isLoading } = useProfileData(userId);

//   if (isLoading) {
//     return <div>로딩중</div>;
//   }

//   // console.log(reviews, "리뷰");
//   let totalReplies = 0;
//   reviews.forEach(item => (totalReplies += item.replies.length));
//   // console.log(partTime);

//   let partTimeTotalRp = 0;
//   if (partTime.byUser) {
//     partTime.byUser.forEach(user => {
//       // `byUser` 배열 하나를 기본으로 1 추가
//       // partTimeTotalRp += 1;
//       // `extra.content` 배열의 길이를 가져와 추가
//       if (user.extra && Array.isArray(user.extra.contents)) {
//         partTimeTotalRp += user.extra.contents.length;
//       }
//     });
//   }

//   // const partTimeTotalRp = partTime.byUser.length+partTime.byUser.map((item)=>item.);

//   const list = reviews.map(item => (
//     <MyReviewList key={item._id} item={item} btnTxt={btnTxt} />
//   ));
//   const hireList = partTime?.byUser.map(item => (
//     <MyReviewList key={item._id} partTime={item} btnTxt={btnTxt} />
//   ));
//   // console.log("list", list);
//   // console.log("hireList", hireList);
//   return (
//     <div className="mb-[40px]">
//       <div className="flex  px-5 pb-5">
//         <p className="font-bold text-[1.125rem] flex-grow ">
//           {btnTxt === "사장"
//             ? `리뷰 ${totalReplies}개`
//             : `리뷰 ${partTimeTotalRp}개`}
//         </p>
//         <Button
//           color={btnTxt === "사장" ? "purple" : "purple"}
//           className="w-14"
//           onClick={hireBtn}
//           height="sm"
//         >
//           {btnTxt}
//         </Button>
//       </div>
//       {btnTxt === "사장" && totalReplies === 0 ? (
//         <div className="py-10 -mb-[80px] -mt-[140px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
//           받은 리뷰가 없어요.
//           <br />
//           공고 리스트를 탐색하고 다양한 알바를 지원해보세요!
//         </div>
//       ) : btnTxt === "알바" && partTimeTotalRp === 0 ? (
//         <div className="py-10 -mb-[80px] -mt-[140px] max-w-screen-sm m-auto h-screen overflow-y-auto flex items-center justify-center text-center text-xl text-gray-300">
//           받은 리뷰가 없어요.
//           <br />
//           공고 리스트를 탐색하고 다양한 알바를 지원해보세요!
//         </div>
//       ) : (
//         // 리뷰 리스트 렌더링
//         <div>{btnTxt === "사장" ? list : hireList}</div>
//       )}
//     </div>
//   );
// }
