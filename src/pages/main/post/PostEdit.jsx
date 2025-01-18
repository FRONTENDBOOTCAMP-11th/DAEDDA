import Button from "@components/Button";
import InputField from "@components/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import MainMap from "@pages/main/post/MainMap";
import { useGetProductDetail } from "@hooks/useGetProductDetail";

export default function PostEdit() {
  const { _id } = useParams();
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [imageError, setImageError] = useState(true);

  const { data: productData } = useGetProductDetail(_id);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (productData) {
      setValue("name", productData.name);
      setValue("price", productData.price);
      setValue("quantity", productData.quantity);
      if (productData) {
        const sanitizedHTML = DOMPurify.sanitize(productData.content);
        setValue("content", sanitizedHTML);
      }
      setValue("location", productData.extra?.location);
      setValue("address", productData.extra?.address);
      setValue("date", productData.extra?.condition?.date);
      setValue("company", productData.extra?.condition?.company);
      setValue("workTime", productData.extra?.condition?.workTime.join("-"));
      if (productData.mainImages?.[0]?.path) {
        const imageUrl = `https://11.fesp.shop${productData.mainImages[0].path}`;
        setPreview(imageUrl);
      }
    }
  }, [productData, setValue]);

  const editPost = useMutation({
    mutationFn: async formData => {
      let body = {
        name: formData.name,
        price: formData.price,
        quantity: 1,
        content: formData.content,
        extra: {
          location: [35.155625, 129.131793],
          address: formData.address,
          condition: {
            date: formData.date,
            company: formData.company,
            workTime: formData.workTime.split("-"),
          },
          worker: {
            userId: null,
            orderId: null,
          },
          state: "EM010",
        },
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

      return axios.patch(`/seller/products/${_id}`, body);
    },
    onSuccess: () => {
      navigate(`/post/${_id}`);
    },
    onError: error => {
      console.error("수정 실패:", error);
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

  return (
    <form className="mb-[40px]" onSubmit={handleSubmit(editPost.mutate)}>
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

      <fieldset className="">
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
        <legend className="text-[1rem] font-bold mb-2">위치</legend>
        <MainMap />
      </fieldset>

      <fieldset>
        <InputField
          labelName="가게 이름"
          type="text"
          placeholder="가게 이름"
          register={register("company", {
            required: "가게 이름 입력은 필수입니다.",
          })}
          errorMsg={errors.company?.message}
        />

        <InputField
          type="text"
          labelName="일당"
          placeholder="일당은 숫자만 입력주세요."
          register={register("price", {
            required: "일당 입력은 필수입니다.",
            pattern: {
              value: /^[0-9]+$/,
              message: "숫자만 입력해주세요.",
            },
          })}
          errorMsg={errors.price?.message}
        />

        <InputField
          labelName="근무 시간"
          type="text"
          placeholder="근무 시간은 00:00-00:00으로 입력해주세요."
          register={register("workTime", {
            required: "근무 시간은 00:00-00:00으로 입력해주세요.",
            pattern: {
              value: /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/,
              message: "근무 시간은 00:00-00:00 형식으로 입력해주세요.",
            },
          })}
          errorMsg={errors.workTime?.message}
        />
        <InputField
          labelName="근무 날짜"
          type="date"
          register={register("date", {
            required: "날짜 입력은 필수입니다.",
          })}
          errorMsg={errors.date?.message}
        />
      </fieldset>

      <fieldset>
        <InputField
          type="text"
          labelName="근무 내용"
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
      <div className="mt-7">
        <Button color="purple" height="lg" type="submit">
          수정
        </Button>
      </div>
    </form>
  );
}
