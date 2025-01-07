import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Edit() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  console.log(user);

  const [preview, setPreview] = useState(null);
  const fileInput = useRef(null);

  // const { data } = useQuery({
  //   queryKey: ["user", "userId"],
  //   queryFn: () => axios.get(`/users/2`),
  //   select: res => res.data,
  //   staleTime: 1000 * 10,
  // });

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        phone: user.phone || "",
        birthday: user.extra?.birthday || "",
      });

      setPreview(
        user.image
          ? `https://11.fesp.shop/${user.image}`
          : "/images/smiling_daeddamon.png",
      );
    }
  }, [user, reset]);

  // console.log(data?.item);

  const editUser = useMutation({
    mutationFn: async formData => {
      // 파일 업로드 처리
      console.log("최종 formData", formData);

      if (fileInput.current) {
        const imageFormData = new FormData();

        imageFormData.append("attach", fileInput.current);

        const fileRes = await axios.post("/files", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const uploadedImagePath = fileRes.data.item[0]?.path;
        // console.log("업로드된 이미지 경로:", uploadedImagePath);

        if (uploadedImagePath) {
          formData.image = uploadedImagePath;
        } else {
          throw new Error("이미지 업로드에 실패했습니다. 경로가 없습니다.");
        }
        delete formData.attach;
        console.log(fileRes.data.item[0]);
      }
      console.log(formData);
      console.log(user);
      return axios.patch(`/users/${user._id}`, formData);
    },
    onSuccess: res => {
      console.log("res", res);
      const updatedUser = res.data.item;
      setUser(prev => ({
        ...prev,
        ...updatedUser,
        extra: { ...prev.extra, birthday: updatedUser.birthday },
      }));

      reset({
        name: updatedUser.name,
        phone: updatedUser.phone,
        birthday: updatedUser.birthday,
      });
      setPreview(
        user.image
          ? `https://11.fesp.shop/${user.image}`
          : "/images/smiling_daeddamon.png",
      );
      console.log("수정된정보", user);
      alert("정보가 수정되었습니다");
      // navigate(`/myPage`);
    },
    onError: err => {
      console.error(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else {
        alert(err.response?.data.message || "잠시후 다시 요청하세요");
      }
    },
  });
  const imageChange = e => {
    const file = e.target.files[0];
    // console.log("File이다", file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); // 미리보기 업뎃뎃
      fileInput.current = file;
    }
  };
  return (
    <form onSubmit={handleSubmit(editUser.mutate)}>
      <div className="mb-[40px]">
        <div className="border-gray-200 border-b mb-5">
          <div className="flex flex-col items-center justify-center h-full mb-4">
            <div className="relative inline-block">
              <label htmlFor="image-upload" className="cursor-pointer">
                <img
                  src={preview || "/images/smiling_daeddamon.png"}
                  alt="프로필 이미지"
                  className="size-32 mx-auto mb-3"
                />
                <img
                  src="/icons/imgEdit.svg"
                  alt="프로필 이미지 수정"
                  className="absolute right-2 bottom-2"
                />
              </label>
            </div>
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              {...register("attach")}
              onChange={imageChange}
            />
          </div>
        </div>

        <InputField
          errorMsg={errors.name?.message}
          labelName="닉네임"
          placeholder="닉네임을 입력해 주세요."
          register={register("name", {
            required: "닉네임은 필수 입력 입니다.",
            minLength: {
              value: 2,
              message: "닉네임은 두글자 이상 입력해주세요.",
            },
            maxLength: {
              value: 10,
              message: "닉네임은 최대 10글자 입력 가능합니다.",
            },
          })}
        />

        <InputField
          errorMsg={errors.phone?.message}
          labelName="휴대폰 번호"
          type="text"
          placeholder="휴대폰 번호는 '-'를 제외하고 입력해주세요."
          register={register("phone", {
            required: "번호 입력은 필수입니다.",
            pattern: {
              value: /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/,
              message: "휴대폰 번호는'-'없는 유효한 번호를 입력해주세요",
            },
          })}
        />

        <InputField
          errorMsg={errors.birthday?.message}
          labelName="생년월일"
          type="date"
          placeholder="연도-월-일"
          register={register("birthday", {
            required: "생년월일은 필수 입력입니다.",
          })}
        />

        <div className="flex gap-6 w-full pt-4">
          <Button color="white" height="lg">
            취소
          </Button>
          <Button color="purple" height="lg" type="submit">
            계속
          </Button>
        </div>
      </div>
    </form>
  );
}
