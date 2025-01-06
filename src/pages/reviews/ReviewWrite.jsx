import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";

export default function ReviewWrite() {
  const { _id: post_id } = useParams();
  const location = useLocation();
  const writeTo = location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const axios = useAxiosInstance();

  const addReview = useMutation({
    mutationFn: async formData => {
      let body = {
        order_id: 1,
        product_id: post_id,
        content: formData.content,
        extra: {
          title: formData.title,
          writeTo,
        },
      };

      return axios.post("/replies", body);
    },
    onSuccess: response => {
      console.log(response);
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  return (
    <div className="mb-[40px]">
      <div className="flex justify-between mb-4 flex-wrap">
        <h2 className="text-[20px] font-semibold">
          {writeTo === "person"
            ? `내가 맡긴 장소 : 소문난 손칼국수`
            : `내가 일한 장소 : 소문난 손칼국수`}
        </h2>
        <p className="text-gray-500 font-semibold">12/7 (화)ㆍ10:00 ~ 16:00</p>
      </div>
      <div className="flex gap-1 mb-5">
        <img src="/icons/reviews/star.svg" />
        <img src="/icons/reviews/star.svg" />
        <img src="/icons/reviews/star.svg" />
        <img src="/icons/reviews/star.svg" />
        <img src="/icons/reviews/blankStar.svg" />
      </div>
      <form onSubmit={handleSubmit(addReview.mutate)}>
        <InputField
          labelName="제목"
          placeholder="제목을 입력해 주세요."
          register={register("title", { required: "제목 입력은 필수입니다." })}
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
          {writeTo === "person" ? `보낼 금액: 64,000원` : `받을 금액: 64,000원`}
        </p>
        <Button type="submit" height="lg">
          리뷰 쓰기
        </Button>
      </form>
    </div>
  );
}
