import Button from "@components/Button";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "@/utills/func.js";
import { useMutation } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useGetOrderState } from "@hooks/useGetOrderState";
import useAddAlarm from "@hooks/useAddAlarm";
import { useGetProductDetail } from "@hooks/useGetProductDetail";

EmployedItem.propTypes = {
  product: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default function EmployedItem({ product, refetch }) {
  const navigate = useNavigate();
  const axios = useAxiosInstance();

  const { data: state } = useGetOrderState(product?.extra.state);

  const addAlarm = useAddAlarm();

  const editOrderState = useMutation({
    mutationFn: async ({ orderId, state }) => {
      return axios.patch(`/seller/orders/${orderId}`, {
        state,
      });
    },

    onSuccess: () => {},
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
      editProductState.mutate({ productId: product._id, state: "EM030" });

      // 주문 상태 채택 완료에서 입금 완료로 변경
      editOrderState.mutate({
        orderId: product.extra.worker.orderId,
        state: "WO030",
      });
      addAlarm.mutate({
        targetId: product.extra.worker.userId,
        content: `💸 지원하신 ${product.extra.condition.company}에서 한 일에 대해 입금이 완료되었습니다.`,
        extra: { title: product.extra.condition.company },
      });
      refetch();
      navigate("reviewWrite", {
        state: { product },
      });
    }
  };

  // 리뷰 작성 버튼 클릭 시
  const onReviewWriteClicked = () => {
    navigate("reviewWrite", {
      state: { product },
    });
  };

  return (
    <>
      {product && (
        <div className="p-4 rounded-3xl shadow-custom-shadow mb-5 relative">
          <Link
            to={`/post/${product._id}`}
            className="w-[83px] absolute top-4 right-4"
          >
            <Button color="white" width="xl" height="sm">
              상세 내역
            </Button>
          </Link>
          <div className="mb-6">
            <h4 className="text-sm font-bold">{state.value}</h4>
            <p>{product.extra.condition.company}</p>
            <p>{product.price.toLocaleString()}원</p>
            <p>
              {formatDate(product.extra.condition.date)}ㆍ
              {product.extra.condition.workTime[0]} ~{" "}
              {product.extra.condition.workTime[1]}
            </p>
          </div>
          <Button
            disabled={
              state.value === "구인 완료" || state.value === "송금 완료"
                ? false
                : true
            }
            color={
              state.value === "구인 완료" || state.value === "송금 완료"
                ? "purple"
                : "gray"
            }
            height="md"
            onClick={
              state.value === "구인 완료"
                ? () =>
                    onCompleteClicked(
                      product.extra.condition.company,
                      product.price,
                    )
                : state.value === "송금 완료"
                  ? () => onReviewWriteClicked()
                  : null
            }
          >
            {state.value === "구인 완료" ? "송금하기" : "리뷰 작성하기"}
          </Button>
        </div>
      )}
    </>
  );
}
