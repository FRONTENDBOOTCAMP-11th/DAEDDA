import Button from "@components/Button";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "@/utills/func.js";
import { useMutation } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useGetOrderState } from "@hooks/useGetOrderState";
import { useGetDetailedProduct } from "@hooks/useGetDetailedProduct";

EmployedItem.propTypes = {
  productId: PropTypes.number.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default function EmployedItem({ productId, refetch }) {
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  const { data } = useGetDetailedProduct(productId);
  const state = useGetOrderState(data?.extra.state);
  const targetOrder = data?.orders?.find(
    order =>
      order.state === "WO020" ||
      order.state === "WO030" ||
      order.state === "WO040",
  );

  // seller product에서 상태가 채택 완료인 order 획득
  const editOrderState = useMutation({
    mutationFn: async ({ orderId, state }) => {
      return axios.patch(`/seller/orders/${orderId}`, {
        state,
      });
    },

    onSuccess: () => {
      console.log("order state 입금 완료로 변경");
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  // 구인글 (상품)의 state 변경
  const editProductState = useMutation({
    mutationFn: async ({ productId, state }) => {
      return axios.patch(`/seller/products/${productId}`, {
        "extra.state": state,
      });
    },

    onSuccess: () => {
      refetch();
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  // 구인 완료 버튼 클릭 시
  const onCompleteClicked = (company, price) => {
    const isOkay = confirm(
      `${company}에서 시킨 일이 완료 처리되었습니다. 결제하신 ${price}원이 대신 일 해주신 분에게 전달됩니다.`,
    );
    if (isOkay) {
      // 구인글 상태 구인 완료에서 송금 완료로 변경
      editProductState.mutate({ productId: data._id, state: "EM030" });

      // 주문 상태 채택 완료에서 입금 완료로 변경
      editOrderState.mutate({ orderId: targetOrder._id, state: "WO030" });
      navigate(`reviewWrite/${data._id}`, { state: { order: targetOrder } });
    }
  };

  // 리뷰 작성 버튼 클릭 시
  const onReviewWriteClicked = () => {
    console.log(targetOrder);
    navigate(`reviewWrite/${data._id}`, { state: { order: targetOrder } });
  };

  return (
    <>
      {data && (
        <div className="p-4 rounded-3xl shadow-custom-shadow mb-5 relative">
          <Link
            to={`/main/${data._id}`}
            className="w-[83px] absolute top-4 right-4"
          >
            <Button color="white" width="xl" height="sm">
              상세 내역
            </Button>
          </Link>
          <div className="mb-6">
            <h4 className="text-sm font-bold">{state}</h4>
            <p>{data.extra.condition.company}</p>
            <p>{data.price.toLocaleString()}원</p>
            <p>
              {formatDate(data.extra.condition.date)}ㆍ
              {data.extra.condition.workTime[0]} ~{" "}
              {data.extra.condition.workTime[1]}
            </p>
          </div>

          <Button
            disabled={
              state === "구인 완료" || state === "송금 완료" ? false : true
            }
            color={
              state === "구인 완료" || state === "송금 완료" ? "purple" : "gray"
            }
            height="md"
            onClick={
              state === "구인 완료"
                ? () =>
                    onCompleteClicked(data.extra.condition.company, data.price)
                : state === "송금 완료"
                  ? () => onReviewWriteClicked()
                  : null
            }
          >
            {state === "구인 완료" ? "송금하기" : "리뷰 작성하기"}
          </Button>
        </div>
      )}
    </>
  );
}
