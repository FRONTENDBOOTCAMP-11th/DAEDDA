import { getWorkTime } from "@/utills/func";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const applyClick = () => {
  // alert(`지원글 작성 페이지로 이동합니다.`);
  toast.success(`지원글 작성 페이지로 이동합니다.`);
};

LikeList.propTypes = {
  item: PropTypes.object.isRequired,
};
export default function LikeList({ item }) {
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const removeLike = useMutation({
    mutationFn: _id => axios.delete(`/bookmarks/${_id}`),
    onSuccess: () => {
      // alert("관심 목록에서 삭제되었습니다");
      toast.success("관심 목록에서 삭제되었습니다");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: err => {
      console.error(err);
    },
  });

  // console.log(item);
  return (
    <>
      <div className="likes-container">
        <div className="flex items-center ">
          <p className="text-sm">
            {item.product.extra?.condition?.company || "못된고양이"}
          </p>
          <img
            src="/icons/likes.svg"
            alt="찜하기 버튼"
            className="ml-auto cursor-pointer"
            onClick={() => removeLike.mutate(item._id)}
          />
        </div>
        <Link to={`/post/${item.product._id}`}>
          <div>
            <p className="text-lg font-bold">{item.product.name}</p>
            <div className="flex gap-[6px] items-center">
              <img src="/icons/mapPin.svg" alt="위치 표시" className="size-3" />
              <p className="text-xs">민락동</p>
            </div>
            <div className="flex items-center">
              <div className="font-semibold">
                <p className="text-secondary py-[2px]">
                  {` 일당 ${item.product.price.toLocaleString()}원ㆍ시급
                  ${Math.round(
                    item.product.price /
                      getWorkTime(
                        item.product.extra?.condition?.workTime[0] || "09:00",
                        item.product.extra?.condition?.workTime[1] || "17:00",
                      ),
                  ).toLocaleString()}원`}
                </p>
                <p className="text-beige-500 text-xs pb-3">
                  마감 : {item.product.extra?.condition?.date || "2025-02-01"}
                </p>
              </div>
              <button className="rounded-2xl border border-primary ml-auto">
                <Link to={`/pr/write`} onClick={applyClick}>
                  <div className="flex gap-1 px-2 items-center">
                    <img
                      src="/icons/apply.svg"
                      alt="지원 버튼"
                      className="mb-1"
                    />
                    <p className="text-primary text-sm">지원</p>
                  </div>
                </Link>
              </button>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
