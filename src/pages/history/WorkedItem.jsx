import Button from "@components/Button";
import { useGetOrderState } from "@hooks/useGetOrderState";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "@/utills/func.js";
import { useMutation } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

WorkedItem.propTypes = {
  data: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

// data.extra.position에 따라 worker, employer 구분

export default function WorkedItem({ data, refetch }) {
  const navigate = useNavigate();
  const state = useGetOrderState(data.state);

  const onReviewWriteClicked = () => {
    // editOrderState.mutate(data._id, "WO040");
    navigate(`reviewWrite/${data._id}`);
  };

  const axios = useAxiosInstance();

  const editOrderState = useMutation({
    mutationFn: async ({ orderId, state }) => {
      return axios.patch(`/orders/${orderId}`, {
        state,
      });
    },

    onSuccess: () => {
      refetch();
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  return (
    <>
      {data && (
        <div className="p-4 rounded-3xl shadow-custom-shadow mb-5 relative">
          <Link
            to={`/main/${data.products[0]._id}`}
            className="w-[83px] absolute top-4 right-4"
          >
            <Button color="white" width="xl" height="sm">
              상세 내역
            </Button>
          </Link>
          <div className="mb-6">
            <h4 className="text-sm font-bold">{state}</h4>
            <p>{data.products[0].extra.condition.company}</p>
            <p>{data.products[0].price.toLocaleString()}원</p>
            <p>
              {formatDate(data.products[0].extra.condition.date)}ㆍ
              {data.products[0].extra.condition.workTime[0]} ~{" "}
              {data.products[0].extra.condition.workTime[1]}
            </p>
          </div>
          {/* 리뷰 작성 버튼 활성화 로직 */}

          <Button
            disabled={state === "입금 완료" ? false : true}
            color={state === "입금 완료" ? "purple" : "gray"}
            height="md"
            onClick={() => {
              onReviewWriteClicked();
            }}
          >
            리뷰 작성하기
          </Button>
        </div>
      )}
    </>
  );
}
