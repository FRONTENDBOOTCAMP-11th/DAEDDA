import Button from "@components/Button";
import InputField from "@components/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { formatDate } from "@/utills/func.js";
import { useGetDetailedProduct } from "@hooks/useGetDetailedProduct";
import { useGetMyBookMark } from "@hooks/useGetMyBookMark";

// 1. from이 worked일 때 (내가 한 일)
// 1) order data를 받아서 뿌린다.
// 2) orderId와 함께 리뷰 작성 API를 사용한다.
// 3) orderId와 함께 order의 state를 입금완료에서 리뷰작성완료로 변경한다.
// 4) refetch후 history/worked로 이동한다.

// 2. from이 employed일 때 (내가 시킨 일)
// 1) product data를 받아서 뿌린다.
// 2) product data에 orders 배열에서 상태가 WO030인 userId와 orderId를 뽑는다.
// 3) 뽑은 userId를 target_id로 하여 북마크를 추가한다.
// 4) 뽑은 orderId의 state를 WO040으로 변경한다.
// 5) 현재 product의 state를 "리뷰 작성 완료"로 변경한다.
// 6) refetch후 history/employed로 이동한다.

export default function ReviewWrite() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { from, id: productId } = useParams();

  const [rating, setRating] = useState(0);
  const handleRating = rate => {
    setRating(rate);
  };

  // 데이터 확득
  // 내가 한 일에서 리뷰를 작성하면 order 데이터를,
  // 내가 시킨 일에서 리뷰를 작성하면 sller product 데이터를 받는다.
  // data가 order인 경우 data.products[0]에서,
  // data가 seller product인 경우 data에서 구인 글 정보에 접근한다.
  const { data: product } = useGetDetailedProduct(
    from === "worked" ? null : productId,
  );
  const data = from === "worked" ? order : product;

  // from worked 로직
  const editMyOrderState = useMutation({
    mutationFn: async ({ orderId, state }) => {
      return axios.patch(`/orders/${orderId}`, {
        state,
      });
    },

    onSuccess: () => {},
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  const addWorkedReview = useMutation({
    mutationFn: async formData => {
      const body = {
        order_id: data._id,
        product_id: data.products[0]._id,
        rating,
        content: formData.content,
      };

      return axios.post("/replies", body);
    },
    onSuccess: () => {
      // 주문의 state를 리뷰 작성 완료로 변경
      editMyOrderState.mutate({ orderId: data._id, state: "WO040" });
      alert("리뷰 작성이 완료되었습니다.");
      navigate(-1);
    },

    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  const onWorkedReviewWrite = formData => {
    // 리뷰 작성 API 사용, 리뷰 작성
    addWorkedReview.mutate(formData);
  };

  // from employed 로직
  const editProductState = useMutation({
    mutationFn: async ({ productId, state }) => {
      return axios.patch(`/seller/products/${productId}`, {
        "extra.state": state,
      });
    },

    onSuccess: () => {
      console.log("product state 리뷰 작성 완료로 변경");
    },

    onError: error => {
      console.error("등록 실패:", error);
    },
  });

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

  // seller product에서 상태가 채택 완료인 order 획득
  const targetOrder = data?.orders?.find(order => order.state === "WO020");
  // 1. 기존 북마크 조회
  const { data: myBookmark } = useGetMyBookMark(targetOrder?.user_id);

  console.log(myBookmark);
  const deleteMyBookmark = useMutation({
    mutationFn: async targetId => {
      return axios.delete(`/bookmarks/${targetId}`);
    },
    onSuccess: () => {},
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  const addEmployedReview = useMutation({
    mutationFn: async formData => {
      let body;
      if (!myBookmark) {
        // 2. 기존 북마크가 없는 경우 새로운 내용 추가
        body = {
          target_id: targetOrder.user_id,
          extra: {
            contents: [
              {
                memo: formData.content,
                rating,
              },
            ],
          },
        };
      } else {
        // 2. 기존 북마크가 있는 기존 북마크 컨텐츠 복사
        const previousContents = myBookmark.extra.contents;
        // 3. 새로운 값 push
        previousContents.push({
          memo: formData.content,
          rating,
        });
        // 4. body의 contents로 지정
        body = {
          target_id: targetOrder.user_id,
          extra: { contents: previousContents },
        };
        // 기존 북마크 삭제
        deleteMyBookmark.mutate(myBookmark._id);
      }

      return axios.post("/bookmarks/user", body);
    },
    onSuccess: () => {
      // 게시글의 state를 리뷰 작성 완료로 변경
      editProductState.mutate({ productId, state: "EM040" });
      // worker order의 state를 입금 완료로 변경
      editOrderState.mutate({ orderId: targetOrder._id, state: "WO030" });
      console.log("리뷰 작성 완료");
      alert("리뷰 작성이 완료되었습니다.");
      navigate(-1);
    },

    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  const onEmployedReviewWrite = formData => {
    addEmployedReview.mutate(formData);
  };

  return (
    <>
      {data && (
        <div className="mb-[40px]">
          <div className="flex justify-between mb-4 flex-wrap">
            <h2 className="text-[20px] font-semibold">
              {from === "worked"
                ? `내가 일한 장소 : ${data.products[0].extra.condition.company}`
                : `내가 맡긴 장소 : ${data.extra.condition.company}`}
            </h2>
            <p className="text-gray-500 font-semibold">
              {from === "worked"
                ? `
                ${formatDate(data.products[0].extra.condition.date)}ㆍ ${data.products[0].extra.condition.workTime[0]} ~ ${data.products[0].extra.condition.workTime[1]}
              `
                : `
                ${formatDate(data.extra.condition.date)}ㆍ ${data.extra.condition.workTime[0]} ~ ${data.extra.condition.workTime[1]}
              `}
            </p>
          </div>
          <Rating
            onClick={handleRating}
            SVGstyle={{ display: "inline" }}
            transition
            fillColor="#FEE500"
            className="mb-5"
          />
          <form
            onSubmit={
              from === "worked"
                ? handleSubmit(onWorkedReviewWrite)
                : handleSubmit(onEmployedReviewWrite)
            }
          >
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
              {from === "worked"
                ? `받은 금액: ${data.products[0].price.toLocaleString()}원`
                : `보낼 금액: ${data.price.toLocaleString()}원`}
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
