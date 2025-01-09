import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { formatDate } from "@/utills/func.js";

export default function ReviewWrite() {
  const location = useLocation();
  const navigate = useNavigate();
  const { position, order } = location.state;

  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRating = rate => {
    setRating(rate);
  };

  const axios = useAxiosInstance();

  const editOrderState = useMutation({
    mutationFn: async ({ orderId, state }) => {
      console.log("orderId" + orderId, "state" + state);

      return axios.patch(`/orders/${orderId}`, { state });
    },

    onSuccess: response => {
      console.log("입금 완료로 상태 변경");
      console.log(response);
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  const addReview = useMutation({
    mutationFn: async formData => {
      const body = {
        order_id: order._id,
        product_id: order.products[0]._id,
        rating,
        content: formData.content,
        extra: {
          title: formData.title,
          position,
        },
      };

      return axios.post("/replies", body);
    },
    onSuccess: response => {
      // employer가 리뷰 작성
      if (position === "employer") {
        alert(
          `리뷰가 등록되었습니다. 일당 ${order.products[0].price.toLocaleString()}원이 정상적으로 전달되었습니다.`,
        );
        // employer order의 state를 송금 완료로 변경
        editOrderState.mutate({ orderId: order._id, state: "EM040" });

        // worker order의 state를 입금 완료로 변경
        // 1. product_id === order.products[0]._id && state === "W030"인 주문의 주문 id를 찾는다.
        // a) 상품 상세 조회 API 사용 -> 필터링 후 주문 id 획득
        // b) 판매자에게 주문한 주문 목록 조회 (상태로 검색) -> 필터링 후 주문 id 획득
        // 2. editOrderState로 state를 변경한다.
      }
      // worker가 리뷰 작성
      else {
        alert(
          `리뷰가 등록되었습니다. 일당 ${order.products[0].price.toLocaleString()}원 입금을 확인해 주세요.`,
        );
        // worker order의 state를 입금 확인으로 변경
        editOrderState.mutate({ orderId: order._id, state: "WO040" });
      }

      console.log(response);
      navigate(-1);
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  return (
    <>
      {order && (
        <div className="mb-[40px]">
          <div className="flex justify-between mb-4 flex-wrap">
            <h2 className="text-[20px] font-semibold">
              {position === "employer"
                ? `내가 맡긴 장소 : ${order.products[0].extra.condition.company}`
                : `내가 일한 장소 : ${order.products[0].extra.condition.company}`}
            </h2>
            <p className="text-gray-500 font-semibold">
              {formatDate(order.products[0].extra.condition.date)}ㆍ
              {order.products[0].extra.condition.workTime[0]} ~{" "}
              {order.products[0].extra.condition.workTime[1]}
            </p>
          </div>
          <Rating
            onClick={handleRating}
            SVGstyle={{ display: "inline" }}
            transition
            fillColor="#FEE500"
            className="mb-5"
          />
          <form onSubmit={handleSubmit(addReview.mutate)}>
            <InputField
              labelName="제목"
              placeholder="제목을 입력해 주세요."
              register={register("title", {
                required: "제목 입력은 필수입니다.",
              })}
              errorMsg={errors.title?.message}
            />
            <InputField
              isTextArea={true}
              labelName="내용"
              placeholder="내용을 입력해 주세요."
              register={register("content", {
                required: "내용 입력은 필수입니다.",
              })}
              errorMsg={errors.content?.message}
            />
            <p className="text-[18px] font-semibold mb-4">
              {position === "employer"
                ? `보낼 금액: ${order.products[0].price.toLocaleString()}원`
                : `받을 금액: ${order.products[0].price.toLocaleString()}원`}
            </p>
            <Button type="submit" height="lg">
              리뷰 쓰기
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
