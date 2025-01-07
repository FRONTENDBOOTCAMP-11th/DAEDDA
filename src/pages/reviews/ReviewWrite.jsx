import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useGetPost } from "@hooks/useGetPost";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { formatDate } from "@/utills/func.js";
import { useGetOrder } from "@hooks/useGetOrder";

export default function ReviewWrite() {
  const { _id: product_id } = useParams();
  const location = useLocation();
  const from = location.state;
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const { data } = useGetPost(product_id);
  const { data: order } = useGetOrder(product_id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRating = rate => {
    setRating(rate);
  };

  const axios = useAxiosInstance();

  if (order && data)
    console.log("order: " + order[0]._id, "product id" + data._id);

  const addReview = useMutation({
    mutationFn: async formData => {
      let body = {
        order_id: order[0]._id,
        product_id: +product_id,
        rating,
        content: formData.content,
        extra: {
          title: formData.title,
          from,
        },
      };

      return axios.post("/replies", body);
    },
    onSuccess: response => {
      if (from === "hired")
        alert(
          `리뷰가 등록되었습니다. 일당 ${data.price.toLocaleString()}원이 정상적으로 전달되었습니다..`,
        );
      else {
        alert(
          `리뷰가 등록되었습니다. 일당 ${data.price.toLocaleString()}원 입금을 확인해 주세요.`,
        );
      }
      navigate(-1);
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  return (
    <>
      {data && (
        <div className="mb-[40px]">
          <div className="flex justify-between mb-4 flex-wrap">
            <h2 className="text-[20px] font-semibold">
              {from === "hired"
                ? `내가 맡긴 장소 : ${data.extra.condition.company}`
                : `내가 일한 장소 : ${data.extra.condition.company}`}
            </h2>
            <p className="text-gray-500 font-semibold">
              {formatDate(data.extra.condition.date)}ㆍ
              {data.extra.condition.workTime[0]} ~{" "}
              {data.extra.condition.workTime[1]}
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
              {from === "hired"
                ? `보낼 금액: ${data.price.toLocaleString()}원`
                : `받을 금액: ${data.price.toLocaleString()}원`}
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
