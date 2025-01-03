import Button from "@components/layout/Button";
import InputField from "@components/layout/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Edit() {
  const axios = useAxiosInstance();

  const { data, isLoading } = useQuery({
    queryKey: ["user", "userId"],
    queryFn: () => axios.get(`/users/2`),
    select: res => res.data,
    staleTime: 1000 * 10,
  });
  console.log(data);
  console.log(data?.item);

  const editUser = useMutation({
    mutationFn: formData => axios.patch("/users/2", formData),
    onSuccess: () => {
      alert("정보가 수정되었습니다");
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  //비동기로 가져온 데이터를 폼에 반영
  useEffect(() => {
    if (data?.item) {
      reset({
        name: data.item.name,
        email: data.item.email,
        phone: data.item.phone,
        birth: data.item.extra.birthday,
      });
    }
  }, [data, reset]);

  const handleFormSubmit = formData => {
    editUser.mutate(formData);
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }
  const imgChange = () => {
    console.log("hi");
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="mb-[40px]">
          <div className=" border-gray-200 border-b mb-5">
            <div className="flex flex-col items-center justify-center h-full mb-4">
              <div className="relative inline-block -z-10" onClick={imgChange}>
                <img
                  src={
                    data?.item?.image
                      ? `https://11.fesp.shop/${data.item.image}`
                      : "/images/smiling_daeddamon.png"
                  }
                  alt="프로필 이미지"
                  className="size-32 mx-auto mb-3 "
                />

                <img
                  src="/icons/imgEdit.svg"
                  alt="프로필 이미지 수정"
                  className="absolute right-2 bottom-2"
                />
              </div>
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
            errorMsg={errors.birth?.message}
            labelName="생년월일"
            type="date"
            placeholder="연도-월-일"
            register={register("birth", {
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
    </>
  );
}
