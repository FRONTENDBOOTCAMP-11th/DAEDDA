import Button from "@components/Button";
import InputField from "@components/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { formatDate } from "@/utills/func.js";

export default function ReviewWrite() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state.order;
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
        order_id: order._id,
        product_id: order.products[0]._id,
        rating,
        content: formData.content,
      };

      return axios.post("/replies", body);
    },
    onSuccess: () => {
      // 주문의 state를 리뷰 작성 완료로 변경
      editMyOrderState.mutate({ orderId: order._id, state: "WO040" });
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

  const deleteMyBookmark = useMutation({
    mutationFn: async bookmarkId => {
      console.log("기존 북마크 제거");
      return axios.delete(`/bookmarks/${bookmarkId}`);
    },
    onSuccess: () => {},
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  const onEmployedReviewSucces = () => {
    // 게시글의 state를 리뷰 작성 완료로 변경
    editProductState.mutate({ productId, state: "EM040" });
    alert("리뷰 작성이 완료되었습니다.");
    navigate(-1);
  };

  const addEmployedReview = useMutation({
    mutationFn: async formData => {
      const body = {
        target_id: order.user_id,
        extra: {
          contents: [
            {
              memo: formData.content,
              rating,
            },
          ],
        },
      };

      return axios.post("/bookmarks/user", body);
    },

    onSuccess: () => {
      onEmployedReviewSucces();
    },

    onError: async (error, formData) => {
      if (error.response && error.response.status === 409) {
        // 기존 북마크 정보 획득
        const res = await axios.get(`/bookmarks/user/${order.user_id}`);
        const prevBookmarkId = res.data.item._id;
        const prevContents = res.data.item.extra.contents;
        // 내용 교체, 기존 북마크 제거
        prevContents.push({
          memo: formData.content,
          rating,
        });
        await deleteMyBookmark.mutateAsync(prevBookmarkId);
        // 다시 axios 요청
        await axios.post("/bookmarks/user", {
          target_id: order.user_id,
          extra: {
            contents: prevContents,
          },
        });
        onEmployedReviewSucces();
      } else {
        console.error("등록 실패:", error);
      }
    },
  });

  const onEmployedReviewWrite = formData => {
    addEmployedReview.mutate(formData);
  };

  return (
    <>
      {order && (
        <div className="mb-[40px]">
          <div className="flex justify-between mb-4 flex-wrap">
            <h2 className="text-[20px] font-semibold">
              {from === "worked" ? `내가 일한 장소 : ` : `내가 맡긴 장소 : `}
              {order.products[0].extra.condition.company}
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
              {from === "worked" ? "받은 금액 : " : "보낼 금액 : "}
              {`${order.products[0].price.toLocaleString()}원`}
            </p>
            <Button color="purple" type="submit" height="lg">
              리뷰 쓰기
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
