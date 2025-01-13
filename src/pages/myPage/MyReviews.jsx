import Button from "@components/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import MyReviewList from "@pages/myPage/MyReviewList";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function MyReviews() {
  const userId = location.pathname.split("/")[3];
  // console.log(userId);

  const axios = useAxiosInstance();
  const [btnTxt, setBtnTxt] = useState("사장");
  const hireBtn = () => {
    setBtnTxt(btnTxt === "사장" ? "알바" : "사장");
  };
  // const { user } = useUserStore();

  //-----------사장일 때 받은 리뷰 api----------------
  const { data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () => axios.get(`/replies/seller/${userId}`),
    select: res => res.data,
    staleTime: 1000 * 10,
  });

  //----------------알바생일때 받은 리뷰일 때 api --------------
  const { data: partTime } = useQuery({
    queryKey: ["reviews", "partTime"],
    queryFn: () => axios.get(`users/${userId}/bookmarks`),
    select: res => res.data.item, ///byUser로 불러오면됨
  });
  // console.log("알바생입장에서", partTime);
  if (!data || !partTime) {
    return <div>로딩중</div>;
  }

  // console.log("사장입장에서", data);
  // 댓글 수 계산
  let totalReplies = 0;
  data.item.forEach(item => (totalReplies += item.replies.length));

  const partTimeTotalRp = partTime.byUser.length;
  // console.log(partTimeTotalRp);

  const list = data.item.map(item => (
    <MyReviewList key={item._id} item={item} btnTxt={btnTxt} />
  ));
  const hireList = partTime?.byUser.map(item => (
    <MyReviewList key={item.user_id} partTime={item} btnTxt={btnTxt} />
  ));
  // console.log("list", list);
  // console.log("hireList", hireList);
  return (
    <div className="mb-[40px]">
      <div className="flex  px-5 pb-5">
        <p className="font-bold text-[18px] flex-grow ">
          {btnTxt === "사장"
            ? `리뷰 ${totalReplies}개`
            : `리뷰 ${partTimeTotalRp}개`}
        </p>
        <Button
          color={btnTxt === "사장" ? "purple" : "purple"}
          className="w-14"
          onClick={hireBtn}
          height="sm"
        >
          {btnTxt}
        </Button>
      </div>
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
        <div>{btnTxt === "사장" ? list : hireList}</div>
      )}
      {/* {btnTxt === "사장" ? list : hireList} */}
    </div>
  );
}
