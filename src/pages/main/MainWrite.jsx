import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import MainMap from "@pages/main/MainMap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

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

  const addPost = useMutation({
    mutationFn: async formData => {
      let body = {
        name: formData.name,
        price: formData.price,
        quantity: 1,
        content: DOMPurify.sanitize(formData.content, { ALLOWED_TAGS: [] }),
        extra: {
          location: [35.155625, 129.131793],
          address: formData.address,
          condition: {
            date: formData.date,
            company: formData.company,
            workTime: formData.workTime.split(" - "),
          },
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

      return axios.post("/seller/products", body);
    },
    onSuccess: response => {
      const mainPostId = response.data.item._id;
      queryClient.invalidateQueries({ queryKey: ["posts", mainPostId] });
      navigate(`/main/${mainPostId}`);
    },
    onError: error => {
      console.error("등록 실패:", error);
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
    <form className="mb-[40px]" onSubmit={handleSubmit(addPost.mutate)}>
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
          placeholder="급여는 숫자만 입력주세요."
          register={register("price", {
            required: "급여 입력은 필수입니다.",
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
        <Button color="purple" height="lg" type="submit">
          등록
        </Button>
      </div>
    </form>
  );
}
