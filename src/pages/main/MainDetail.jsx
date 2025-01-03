import Button from "@components/layout/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import Badge from "@pages/main/Badge";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useNavigate, useParams } from "react-router-dom";
import { getWorkTime, formatDate } from "@/utills/func";
import DOMPurify from "dompurify";

export default function MainDetail() {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const { _id } = useParams();

  const { data } = useQuery({
    queryKey: ["seller/products", _id],
    queryFn: () => axios.get(`/seller/products/${_id}`),
    select: res => res.data,
  });

  const sanitizedContent = DOMPurify.sanitize(`${data?.item.content}`);

  console.log(data?.item);

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

  const handleDelete = () => {
    const deletePost = window.confirm("삭제 하시겠습니까?");
    if (deletePost) {
      removePost.mutate(_id);
    }
  };

  const editDetailPost = useMutation({
    mutationFn: _id => axios.patch(`/seller/products/${_id}`),

    onSuccess: () => {
      navigate(`/main/${_id}/edit`);
    },

    onError: error => {
      console.error("글 수정", error);
      alert("글 수정에 실패했습니다.");
    },
  });

  const handleEdit = () => {
    const editPost = window.confirm("수정 하시겠습니까?");
    if (editPost) {
      editDetailPost.mutate(_id);
    }
  };

  const handleApply = () => {
    const applyPost = window.confirm("지원 하시겠습니까?");
    if (applyPost) {
      navigate("/pr/write");
    }
  };

  return (
    <div className="mb-[40px]">
      <section className="flex items-center justify-between mt-4 flex-wrap">
        <div className="font-bold text-[20px] py-4 break-keep whitespace-normal">
          {data?.item.name}
        </div>
        {/* <img
          src="/icons/blackHeart.svg"
          className="h-7 w-7 ml-2"
          alt="찜 아이콘"
        /> */}
        <div className="flex justify-end gap-2 screen-530:justify-end screen-530:w-full">
          <div className="w-[92px] h-[32px]">
            <Button color="purple" width="xl" height="sm" onClick={handleEdit}>
              수정
            </Button>
          </div>

          <div className="w-[92px] h-[32px]">
            <Button color="red" width="2xl" height="sm" onClick={handleDelete}>
              삭제
            </Button>
          </div>
        </div>
      </section>

      <section className="flex items-center h-20 shadow-custom-shadow rounded-3xl mt-6 p-3">
        <img
          src={`https://11.fesp.shop/${data?.item.seller.image}`}
          className="w-11 h-11"
          alt="프로필 이미지"
        />
        <h2 className="font-bold ml-5">{data?.item.seller.name}</h2>
        <h2 className="font-light ml-5">{formatDate(data?.item.createdAt)}</h2>
      </section>

      <section className="mt-7">
        <h2 className="font-bold mb-2">근무지 사진</h2>
        <div className="mt-2 mb-7 w-[136px] h-[136px] flex bg-slate-600 items-center justify-center rounded-lg cursor-pointer">
          <img
            src={`https://11.fesp.shop/files/final01/${data?.item.mainImages[0].name}`}
            alt="근무지 이미지"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <h2 className="font-bold mb-2">위치</h2>
        <div className="w-full h-40 bg-slate-600 rounded-lg"></div>
        <div className="mt-4 sm:whitespace-normal md:whitespace-nowrap">
          {data?.item.extra.addres}
        </div>
      </section>

      <div className="mt-7">
        <section>
          <h2 className="font-bold mb-2">근무 조건</h2>

          <div className="grid custom-375:grid-cols-1 grid-cols-2  gap-6">
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">{data?.item.extra.condition.company}</h2>
            </article>
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">{data?.item.price} 원</h2>
            </article>
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">{data?.item.extra.condition.date}</h2>
            </article>
            <article className=" flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">
                {data?.item?.extra?.condition?.workTime
                  ? `${data.item.extra.condition.workTime[0]} ~ ${data.item.extra.condition.workTime[1]}ㆍ${getWorkTime(
                      data.item.extra.condition.workTime[0],
                      data.item.extra.condition.workTime[1],
                    )}` + "시간"
                  : "근무 시간이 제공되지 않았습니다."}
              </h2>
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
        <div className="mt-7 ">
          <Button
            color="purple"
            height="lg"
            type="submit"
            onClick={handleApply}
          >
            지원하기
          </Button>
        </div>

        <div>
          <section className="mt-7 pt-7 flex justify-between border-t-8">
            <div className="flex items-center gap-3">
              <img
                src="/src/assets/images/smiling_daeddamon.png"
                className="w-16 h-16"
                alt="스마일 대따몬"
              />
              <div className="flex flex-col">
                <div className="flex">
                  <h2 className="font-bold mr-1">닉네임</h2>
                  <Badge number={70} />
                </div>
                <h2 className="font-light">2024/12/25</h2>
              </div>
            </div>
            <div className="flex w-[78px] ml-auto">
              <Button color="white" height="sm">
                상세 내역
              </Button>
            </div>
          </section>

          <section className="break-keep whitespace-normal">
            <div className="font-bold mt-7">근무 조건</div>
            <div className="mt-2">
              카카오 프론트엔드 개발자 지원합니다! 열심히 하겠습니다.
            </div>

            <div className="font-bold mt-7">휴대폰 번호</div>
            <div className="mt-2">010-xxxx-xxxx</div>

            <div className="font-bold mt-7">상세 경력</div>
            <div className="mt-2">
              카카오 프론트엔드 개발자 지원합니다! 열심히 하겠습니다.
            </div>

            <div className="font-bold mt-7 ">자신을 표현해주세요!</div>
            <div className="mt-2">프로젝트에서 말하는 감자를 담당했습니다.</div>

            <div className="flex gap-2 h-[32px] justify-center my-10">
              <div className="w-72">
                <Button color="purple" width="xl" height="sm">
                  채택
                </Button>
              </div>
              <div className="w-72">
                <Button color="red" width="2xl" height="sm">
                  취소
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
