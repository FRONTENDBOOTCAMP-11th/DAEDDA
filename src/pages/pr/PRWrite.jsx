import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";
import { useLocation, useNavigate } from "react-router-dom";

export default function PRWrite() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const location = useLocation();
  const productId = location.state?.product_id;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const prPost = useMutation({
    mutationFn: async formData => {
      let body = {
        type: "pr",
        product_id: productId,
        title: formData.title,
        content: DOMPurify.sanitize(formData.content, { ALLOWED_TAGS: [] }),
      };
      return axios.post("/posts/", body);
    },

    onSuccess: response => {
      console.log("Response Data:", response.data);
      const prId = response.data.item.product_id;
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate(`/main/${prId}`);
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

  return (
    <form
      className="mb-[40px]"
      onSubmit={handleSubmit(data => prPost.mutate(data))}
    >
      <div className="mt-5">
        <InputField
          labelName="제목"
          type="text"
          placeholder="제목"
          register={register("title", {
            required: "제목 입력은 필수입니다",
            minLength: {
              value: 2,
              message: "제목은 최소 2자 이상 입력해주세요.",
            },
          })}
          errorMsg={errors.title?.message}
        />
      </div>

      <fieldset>
        <InputField
          type="text"
          labelName="지원 내용"
          placeholder="자신을 어필해주세요!"
          isTextArea={true}
          register={register("content", {
            required: "지원 내용은 최소 10자 이상 입력해주세요.",
            minLength: {
              value: 10,
              message: "지원 내용은 최소 10자 이상 입력해주세요.",
            },
          })}
          errorMsg={errors.content?.message}
        />
      </fieldset>

      <div className="mt-7">
        <Button color="purple" type="submit" height="lg">
          등록
        </Button>
      </div>
    </form>
  );
}
