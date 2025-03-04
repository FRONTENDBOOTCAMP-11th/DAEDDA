import { getWorkTime } from "@/utills/func";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const applyClick = () => {
  // alert(`지원글 작성 페이지로 이동합니다.`);
  toast.success(`지원글 작성 페이지로 이동합니다.`, {
    icon: <img src="/icons/toastCheck.svg" alt="success" />,
  });
};

LikeList.propTypes = {
  item: PropTypes.object.isRequired,
};
export default function LikeList({ item }) {
  const [date, setDate] = useState(false);

  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const removeLike = useMutation({
    mutationFn: _id => axios.delete(`/bookmarks/${_id}`),
    onSuccess: () => {
      // alert("관심 목록에서 삭제되었습니다");
      toast.success("관심 목록에서 삭제되었습니다", {
        icon: <img src="/icons/toastCheck.svg" alt="success" />,
      });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onError: err => {
      console.error(err);
    },
  });
  // console.log(item);

  //마감 날짜 지나면
  useEffect(() => {
    if (new Date(item.product.extra.condition.date) < new Date()) {
      setDate(true);
    }
  }, [item]);

  return (
    <>
      <div className="relative">
        {date && (
          <div className="rounded-3xl bg-gray-200 absolute opacity-90 h-full w-full flex items-center justify-center text-2xl font-bold text-black text-opacity-60 pointer-events-none">
            마감된 공고입니다
          </div>
        )}

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
                  <Link
                    state={{ product_id: item.product._id }}
                    to={`/pr/write`}
                    onClick={applyClick}
                  >
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
      </div>
    </>
  );
}
