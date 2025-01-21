import Button from "@components/Button";
import InputField from "@components/InputField";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Edit() {
  // 선아님 코드 시작
  const goBack = () => {
    navigate(-1);
  };

  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  // console.log(user);

  const [preview, setPreview] = useState(null);
  const fileInput = useRef(null);

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
        birthday: user.extra.birthday || "",
      });

      if (user.image?.includes("kakaocdn.net")) {
        setPreview(user.image);
      } else {
        setPreview(
          user.image
            ? `https://11.fesp.shop/${user.image}`
            : "/images/smiling_daeddamon.png",
        );
      }
    }
  }, [user, reset]);

  // preview 값이 바뀔 때마다 로그를 찍어보는 예시
  useEffect(() => {
    // console.log("렌더링 시점, preview 값:", preview);
  }, [preview]);

  const editUser = useMutation({
    mutationFn: async formData => {
      // console.log("최종 formData", formData);

      if (fileInput.current) {
        const imageFormData = new FormData();

        imageFormData.append("attach", fileInput.current);

        const fileRes = await axios.post("/files", imageFormData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const uploadedImagePath = fileRes.data.item[0]?.path;

        if (uploadedImagePath) {
          formData.image = uploadedImagePath;
        } else {
          throw new Error("이미지 업로드에 실패했습니다. 경로가 없습니다.");
        }
        delete formData.attach;
        // console.log(fileRes.data.item[0]);
      }

      const updatedFormData = {
        ...formData,
        extra: {
          // ...(user.extra || {}),
          birthday: formData.birthday, // birthday를 extra로 이동
        },
      };
      delete updatedFormData.birthday;
      // console.log(formData);
      // console.log(user);
      // console.log("서버로 보낼 데이터:", updatedFormData);
      return axios.patch(`/users/${user._id}`, updatedFormData);
    },
    onSuccess: res => {
      // console.log("res", res);
      const updatedUser = res.data.item;
      // console.log(updatedUser);
      const newUser = {
        ...user,
        ...updatedUser,
        extra: {
          ...user.extra,
          birthday: updatedUser?.extra?.birthday,
        },
      };

      setUser(newUser);
      // console.log(newUser);

      reset({
        name: newUser.name,
        phone: newUser.phone,
        birthday: newUser.extra.birthday,
      });
      setPreview(
        user.image
          ? `https://11.fesp.shop/${user.image}`
          : "/images/smiling_daeddamon.png",
      );

      if (user.isNew) {
        const { isNew, ...rest } = newUser;
        setUser(rest);

        // alert(`환영합니다 ${user.name} 님!`);
        toast.success(`환영합니다 ${user.name} 님!`, {
          icon: <img src="/icons/fire.svg" alt="success" />,
        });
        navigate("/");
      } else {
        // alert("정보가 수정되었습니다");
        toast.success("정보가 수정되었습니다", {
          icon: <img src="/icons/toastCheck.svg" alt="success" />,
        });
        navigate(`/myPage`);
      }
    },
    onError: err => {
      // console.error(err);
      if (err.response?.data.errors) {
        err.response?.data.errors.forEach(error =>
          setError(error.path, { message: error.msg }),
        );
      } else {
        // alert(err.response?.data.message || "잠시후 다시 요청하세요");
        toast.error(err.response?.data.message || "잠시후 다시 요청하세요");
      }
    },
  });
  const imageChange = e => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl); // 미리보기 업뎃뎃
      fileInput.current = file;
    }
  };
  // 선아님 코드 끝

  // 인풋 공백 방지
  const preventSpace = e => {
    if (e.key === " ") e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit(editUser.mutate)}>
      <div className="mb-[40px]">
        <div className="border-gray-200 border-b mb-5">
          <div className="flex flex-col items-center justify-center h-full mb-4">
            <div className="relative inline-block ">
              <label htmlFor="image-upload" className="cursor-pointer">
                <img
                  src={preview || "/images/smiling_daeddamon.png"}
                  alt="프로필 이미지"
                  className="size-32 mx-auto mb-3 rounded-full object-cover"
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
          maxLength={10}
          placeholder="닉네임을 입력해 주세요."
          onKeyPress={preventSpace}
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
          onKeyPress={preventSpace}
          maxLength={11}
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
          max={new Date().toISOString().split("T")[0]}
        />

        <div className="flex gap-6 w-full pt-4">
          <Button color="white" height="lg" onClick={goBack}>
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
