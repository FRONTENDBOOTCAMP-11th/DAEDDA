import Button from "@components/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getWorkTime, formatDate } from "@/utills/func";
import DOMPurify from "dompurify";
import PostPR from "@pages/main/PostPR";
import { useCallback, useEffect, useState } from "react";
import useUserStore from "@zustand/userStore";

export default function PostDetail() {
  const [bookMark, setBookMark] = useState(false);
  const queryClient = useQueryClient();
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { user } = useUserStore();
  const userId = user?._id;

  const { data } = useQuery({
    queryKey: ["products", _id],
    queryFn: () => axios.get(`/products/${_id}`),
    select: res => res.data,
  });

  const sanitizedContent = DOMPurify.sanitize(`${data?.item.content}`);

  const removePost = useMutation({
    mutationFn: _id => axios.delete(`/seller/products/${_id}`),

    onSuccess: () => {
      alert("공고 페이지가 삭제되었습니다.");
      queryClient.invalidateQueries(["seller/products"]);
      navigate("/");
    },

    onError: error => {
      console.error("삭제 실패", error);
      alert("삭제에 실패했습니다.");
    },
  });

  const editDetailPost = useMutation({
    mutationFn: _id => axios.patch(`/seller/products/${_id}`),

    onSuccess: () => {
      navigate(`/post/${_id}/edit`);
    },

    onError: error => {
      console.error("글 수정", error);
      alert("글 수정에 실패했습니다.");
    },
  });

  const handleDelete = useCallback(
    event => {
      event.preventDefault();
      if (window.confirm("삭제 하시겠습니까?")) {
        removePost.mutate(_id);
      }
    },
    [_id, removePost],
  );

  const handleEdit = useCallback(() => {
    editDetailPost.mutate(_id);
  }, [_id, editDetailPost]);

  const handleApply = () => {
    const applyPost = window.confirm("지원 하시겠습니까?");
    if (applyPost) {
      navigate("/pr/write", { state: { product_id: data?.item._id } });
    }
  };

  const addBookMark = useMutation({
    mutationFn: async formData => {
      const body = {
        target_id: formData.product_id,
        extra: {
          type: "product",
        },
      };
      return axios.post(`/bookmarks/product`, body);
    },
    onMutate: () => {
      setBookMark(true);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarks"]);
      alert("북마크 추가");
    },
    onError: error => {
      console.error("북마크 실패", error);
      setBookMark(false);
    },
  });

  useEffect(() => {
    if (data?.item?.bookmarks) {
      setBookMark(true);
    }
  }, [data]);

  const deleteBookMark = useMutation({
    mutationFn: async bookmarkId => {
      axios.delete(`/bookmarks/${bookmarkId}`);
    },
    onMutate: () => {
      setBookMark(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products", _id]);
      queryClient.invalidateQueries(["bookmarks"]);
      alert("찜하기 삭제");
    },
    onError: error => {
      console.error("북마크 삭제 실패", error);
      setBookMark(true);
    },
  });

  const handleBookMarkToggle = () => {
    if (bookMark) {
      deleteBookMark.mutate(data?.item.myBookmarkId);
    } else {
      addBookMark.mutate({ product_id: data?.item._id });
    }
  };

  const handleUserPage = product_id => {
    if (userId === product_id) {
      navigate(`/mypage`);
    } else {
      navigate(`/user/${data?.item.seller._id}`);
    }
  };

  return (
    <div className="mb-[40px]">
      <section className="flex items-center justify-between mt-4 flex-wrap">
        <div className="font-bold text-[20px] py-4 break-keep whitespace-normal">
          {data?.item.name}
        </div>

        {data?.item.seller_id === userId ? (
          <div className="flex justify-end gap-2 screen-530:justify-end screen-530:w-full">
            <div className="w-[92px] h-[32px]">
              <Button
                color="purple"
                width="xl"
                height="sm"
                onClick={handleEdit}
              >
                수정
              </Button>
            </div>

            <div className="w-[92px] h-[32px]">
              <Button
                color="red"
                width="2xl"
                height="sm"
                onClick={handleDelete}
              >
                삭제
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex" onClick={handleBookMarkToggle}>
            {bookMark ? (
              <img
                src="/icons/likes.svg"
                className="h-7 w-7 ml-2 cursor-pointer"
                alt="찜 풀기 아이콘"
              />
            ) : (
              <img
                src="/icons/blackHeart.svg"
                className="h-7 w-7 ml-2 cursor-pointer"
                alt="찜 아이콘"
              />
            )}
          </div>
        )}
      </section>

      <section
        className="flex items-center h-20 shadow-custom-shadow rounded-3xl mt-6 p-3"
        onClick={() => handleUserPage(data?.item.seller_id)}
      >
        <img
          src={
            data?.item.seller.image
              ? data.item.seller.image.includes("kakaocdn.net")
                ? data.item.seller.image
                : `https://11.fesp.shop/${data?.item.seller.image}`
              : "/images/smiling_daeddamon.png"
          }
          // src={`https://11.fesp.shop/${data?.item.seller.image}`}
          className="w-11 h-11 rounded-full"
          alt="프로필 이미지"
        />
        <h2 className="font-bold ml-5">{data?.item.seller.name}</h2>
        <h2 className="font-light ml-5">{formatDate(data?.item.createdAt)}</h2>
      </section>

      <section className="mt-7">
        <h2 className="font-bold mb-2">근무지 사진</h2>
        <div className="mt-2 mb-7 w-[136px] h-[136px] flex bg-slate-600 items-center justify-center rounded-lg cursor-pointer">
          <img
            src={
              data?.item.mainImages
                ? `https://11.fesp.shop/files/final01/${data?.item.mainImages[0].name}`
                : "https://placehold.co/400"
            }
            alt="근무지 이미지"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <h2 className="font-bold mb-2">위치</h2>
        <div className="w-full h-40 bg-slate-600 rounded-lg"></div>
        <div className="mt-4 sm:whitespace-normal md:whitespace-nowrap">
          {data?.item.extra.address}
        </div>
      </section>

      <div className="mt-7">
        <section>
          <h2 className="font-bold mb-2">근무 조건</h2>

          <div className="grid custom-375:grid-cols-1 grid-cols-2  gap-6">
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">{data?.item.extra.condition?.company}</h2>
            </article>
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">
                {`${data?.item.price.toLocaleString()}원ㆍ시급 ${
                  data?.item.extra?.condition?.workTime
                    ? Math.round(
                        data.item.price /
                          getWorkTime(
                            data.item.extra.condition.workTime[0] || "00:00",
                            data.item.extra.condition.workTime[1] || "00:00",
                          ),
                      ).toLocaleString()
                    : ""
                }원`}
              </h2>
            </article>
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">{data?.item.extra.condition?.date}</h2>
            </article>
            <article className=" flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center screen-425:flex-col">
              <h2 className="">
                {data?.item?.extra?.condition?.workTime
                  ? `${data.item.extra.condition.workTime[0]} ~ ${data.item.extra.condition?.workTime[1]}`
                  : "근무 시간이 제공되지 않았습니다."}
              </h2>
              <span className="screen-425:hidden">ㆍ</span>
              {data?.item?.extra?.condition?.workTime && (
                <h2 className="">
                  {`${getWorkTime(
                    data.item.extra.condition?.workTime[0],
                    data.item.extra.condition?.workTime[1],
                  )}시간`}
                </h2>
              )}
            </article>
          </div>
        </section>
        <section className="flex p-5 items-center shadow-custom-shadow rounded-3xl mt-6">
          <div>
            <h2 className="font-bold ml-3">근무 내용</h2>
            <ul className="ml-8 mt-2 break-keep whitespace-normal">
              <span
                dangerouslySetInnerHTML={{
                  __html: sanitizedContent,
                }}
              ></span>
            </ul>
          </div>
        </section>
        <div className="mt-7">
          {data?.item?.seller_id !== userId ? (
            <Button
              color="purple"
              height="lg"
              type="submit"
              onClick={handleApply}
            >
              지원하기
            </Button>
          ) : (
            ""
          )}
        </div>
        {data?.item?.seller_id == userId ? <PostPR /> : null}
      </div>
    </div>
  );
}
