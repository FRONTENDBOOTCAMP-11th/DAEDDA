import Button from "@components/Button";
import InputField from "@components/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import MainMap from "@pages/main/MainMap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import useUserStore from "@zustand/userStore";
import { getWorkTime } from "@/utills/func";

export default function MainWrite() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState(true);
  const axios = useAxiosInstance();
  const queryClient = useQueryClient();
  const { user } = useUserStore();

  const addPost = useMutation({
    mutationFn: async formData => {
      let body = {
        name: formData.name,
        price: formData.price,
        quantity: 1000,
        content: DOMPurify.sanitize(formData.content, { ALLOWED_TAGS: [] }),
        extra: {
          position: "employer",
          location: [35.155625, 129.131793],
          address: formData.address,
          condition: {
            date: formData.date,
            company: formData.company,
            workTime: formData.workTime.split(" - "),
          },
        },

        state: "EM010",
      };

      if (formData.attach?.length > 0) {
        const imageFormData = new FormData();
        imageFormData.append("attach", formData.attach[0]);

        const imageRes = await axios.post("/files", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        body.mainImages = [
          {
            path: imageRes.data.item[0].path,
            name: imageRes.data.item[0].name,
            originalname: imageRes.data.item[0].originalname,
          },
        ];
      }
      return axios.post("/seller/products", body);
    },
  });

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setValue("attach", [file]);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  const onSubmit = async formData => {
    if (imageError) {
      setImageError(true);
      return;
    }

    const workHours = getWorkTime(
      formData.workTime.split(" - ")[0],
      formData.workTime.split(" - ")[1],
    );

    const paymentData = {
      pgValue: "danal_tpay",
      formData: {
        name: formData.name,
        price: formData.price * workHours,
      },
      user,
    };

    try {
      const postResult = await handlePayment(
        paymentData.pgValue,
        paymentData.formData,
        paymentData.user,
      );

      if (!postResult) {
        alert("결제가 취소되어 게시물이 등록되지 않습니다.");
        return;
      }

      const addPostResponse = await addPost.mutateAsync(formData);
      const productId = addPostResponse.data.item._id;

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate(`/main/${productId}`);
    } catch (error) {
      console.error("등록 또는 구매 실패:", error);
      alert("등록 또는 결제 중 문제가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const handlePayment = async (pgValue, formData, user) => {
    const { IMP } = window;

    if (!IMP.isInitialized) {
      IMP.init("imp14397622");
      IMP.isInitialized = true;
    }
    const accept = window.confirm(
      "대따는 일당을 선 결제로 하고 있습니다.\n\n" +
        "일당 환불 규정:\n" +
        "✅ 채택 후 5일 전 취소: 100% 환불\n" +
        "✅ 채택 후 5일 이후 ~ 근무일 1일 전 취소: 50% 환불\n" +
        "✅ 근무일 당일 취소: 환불 불가능\n\n" +
        "이에 동의하시면 확인 버튼, 거절하시려면 취소 버튼을 눌러주시길 바랍니다.\n" +
        "동의 시 결제창으로 이동하게 됩니다.\n" +
        "취소 시에는 구인글 등록이 되지 않습니다.",
    );

    if (!accept) {
      return;
    }

    const data = {
      pg: pgValue,
      pay_method: "card",
      merchant_uid: `order_${new Date().getTime()}`,
      name: formData.name,
      amount: formData.price,
      buyer_name: user.name,
      buyer_tel: user.phone,
    };

    try {
      const response = await new Promise((resolve, reject) => {
        IMP.request_pay(data, res => {
          if (res.success) {
            resolve(res);
          } else {
            reject(res.error_msg);
          }
        });
      });
      return true;
    } catch (error) {
      console.error("결제 실패:", error);
      return false;
    }
  };

  return (
    <form className="mb-[40px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-5">
        <InputField
          labelName="제목"
          type="text"
          placeholder="제목"
          register={register("name", {
            required: "제목 입력은 필수입니다.",
            minLength: {
              value: 2,
              message: "제목은 최소 2자 이상 입력해주세요.",
            },
          })}
          errorMsg={errors.name?.message}
        />
      </div>

      <fieldset>
        <label htmlFor="photo" className="text-[16px] font-bold">
          근무지 사진
        </label>
        <div className="mt-2 flex items-center">
          {preview ? (
            <>
              <img
                src={preview}
                alt="미리보기"
                className="mr-2 w-[136px] h-[136px] object-cover rounded-lg border border-dashed"
              />
              <label
                htmlFor="image-upload"
                className="w-[136px] h-[136px] flex items-center justify-center rounded-lg border border-dashed cursor-pointer"
              >
                <img src="/icons/plus.svg" className="w-5 h-5" />
              </label>
            </>
          ) : (
            <>
              <label className="mr-2 w-[136px] h-[136px] flex items-center justify-center rounded-lg border border-dashed ">
                미리보기
              </label>
              <label
                htmlFor="image-upload"
                className="w-[136px] h-[136px] flex items-center justify-center rounded-lg border border-dashed cursor-pointer"
              >
                <img src="/icons/plus.svg" className="w-5 h-5" />
              </label>
            </>
          )}

          <input
            type="file"
            id="image-upload"
            accept="image/*"
            className="hidden"
            {...register("attach")}
            onChange={handleImageChange}
          />
        </div>

        <div className="my-2 h-4">
          {imageError && (
            <p className="text-red text-[12px]">*사진 1장은 필수 입니다.</p>
          )}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-[16px] font-bold mb-2">위치</legend>
        <div className="mb-4">
          <MainMap />
        </div>
        <InputField
          type="text"
          placeholder="상세 주소"
          register={register("address", {
            required: "주소 입력은 필수입니다.",
          })}
          errorMsg={errors.address?.message}
        />
      </fieldset>

      <fieldset>
        <InputField
          labelName="근무 조건"
          type="text"
          placeholder="가게 이름"
          register={register("company", {
            required: "가게 이름 입력은 필수입니다.",
          })}
          errorMsg={errors.company?.message}
        />

        <InputField
          type="text"
          placeholder="시급은 숫자만 입력주세요."
          register={register("price", {
            required: "시급 입력은 필수입니다.",
            pattern: {
              value: /^[0-9]+$/,
              message: "숫자만 입력해주세요.",
            },
          })}
          onInput={e => {
            e.target.value = e.target.value.replace(/\s+/g, "");
          }}
          errorMsg={errors.price?.message}
        />

        <InputField
          type="text"
          placeholder="근무 시간은 00:00 - 00:00으로 입력해주세요."
          register={register("workTime", {
            required: "근무 시간은 00:00 - 00:00으로 입력해주세요.",
            pattern: {
              value: /^([01]\d|2[0-3]):([0-5]\d) - ([01]\d|2[0-3]):([0-5]\d)$/,
              message: "근무 시간은 00:00 - 00:00 형식으로 입력해주세요.",
            },
          })}
          errorMsg={errors.workTime?.message}
        />
        <InputField
          type="date"
          register={register("date", {
            required: "날짜 입력은 필수입니다.",
          })}
          onInput={e => {
            e.target.value = e.target.value.replace(/\s+/g, "");
          }}
          errorMsg={errors.date?.message}
        />
      </fieldset>

      <fieldset>
        <InputField
          type="text"
          labelName="근무 내용"
          placeholder="상세한 근무 내용을 적어주세요."
          id="workTxt"
          isTextArea={true}
          register={register("content", {
            required: "근무 내용은 최소 10자 이상 입력해주세요.",
            minLength: {
              value: 10,
              message: "근무 내용은 최소 10자 이상 입력해주세요.",
            },
          })}
          errorMsg={errors.content?.message}
        />
      </fieldset>
      <div className="mt-11">
        <Button
          color="purple"
          height="lg"
          type="submit"
          onSubmit={handleSubmit(onSubmit.mutate)}
        >
          등록
        </Button>
      </div>
    </form>
  );
}
