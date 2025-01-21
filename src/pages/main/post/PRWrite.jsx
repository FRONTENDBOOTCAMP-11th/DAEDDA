import Button from "@components/Button";
import InputField from "@components/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";
import { useLocation, useNavigate } from "react-router-dom";
import useAddAlarm from "@hooks/useAddAlarm";
import { toast } from "react-toastify";

export default function PRWrite() {
  const navigate = useNavigate();
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const location = useLocation();
  const productId = location.state?.product_id;

  const addAlarm = useAddAlarm();
  console.log(productId);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "알바 지원 test",
      content: "알바 지원합니다 지원합니다.",
    },
  });

  const prPost = useMutation({
    mutationFn: async formData => {
      let body = {
        product_id: productId,
        products: [
          {
            _id: productId,
            quantity: 1,
          },
        ],
        extra: {
          title: formData.title,
          content: DOMPurify.sanitize(formData.content, {
            ALLOWED_TAGS: [],
          }),
        },
        state: "WO010",
      };

      return axios.post("/orders/", body);
    },

    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });

      const notificationContent = `🙋‍♂️ 작성하신 "${response.data.item.products[0].name}" 에 새로운 지원자가 있습니다.`;

      addAlarm.mutate({
        targetId: response.data.item.products[0].seller_id,
        content: notificationContent,
        extra: {
          title: response.data.item.products[0].name,
        },
      });
      // alert("성공적으로 지원되었습니다.");
      toast.success("성공적으로 지원되었습니다.", {
        icon: <img src="/icons/toastCheck.svg" alt="success" />,
      });
      navigate(`/post/${productId}`);
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
