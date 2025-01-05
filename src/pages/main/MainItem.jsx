import Button from "@components/layout/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import Badge from "@pages/main/Badge";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function MainItem() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const { _id } = useParams();
  const { data: comments } = useQuery({
    queryKey: ["comments", _id],
    queryFn: () => axios.get(`/posts?type=pr&custom={"product_id":${_id}}`),
    select: res => res.data.item,
  });

  console.log(comments);

  const handleDetail = () => {
    navigate(`pr/${_id}/edit`);
  };

  return (
    <div>
      {comments && comments.length > 0
        ? comments.map(comment => (
            <div key={comment?._id}>
              <section className="mt-7 pt-7 flex justify-between border-t-8">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://11.fesp.shop/files/final01/${comment?.user.image}`}
                    className="w-16 h-16"
                    alt={`${comment?.user.name} 프로필 이미지`}
                  />
                  <div className="flex flex-col">
                    <div className="flex">
                      <h2 className="font-bold mr-1">{comment?.user.name}</h2>
                      <Badge number={70} />
                    </div>
                    <h2 className="font-light">{comment?.updatedAt}</h2>
                  </div>
                </div>
                <div className="flex w-[78px] ml-auto">
                  <Button color="white" height="sm" onClick={handleDetail}>
                    상세 내역
                  </Button>
                </div>
              </section>

              <section className="break-keep whitespace-normal">
                <div className="font-bold mt-7">제목</div>
                <div className="mt-2">{comment?.title}</div>

                <div className="font-bold mt-7">휴대폰 번호</div>
                <div className="mt-2">{comment?.extra.phone}</div>

                <div className="font-bold mt-7" onClick={handleDetail}>
                  상세 경력
                </div>
                <div className="mt-2">{comment?.extra.detail}</div>

                <div className="font-bold mt-7 ">자신을 표현해주세요!</div>
                <div className="mt-2">{comment?.content}</div>

                <div className="flex gap-2 h-[32px] justify-center my-10">
                  <div className="w-72">
                    <Button color="purple" width="xl" height="sm">
                      채택
                    </Button>
                  </div>
                  <div className="w-72">
                    <Button color="red" width="2xl" height="sm">
                      거절
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          ))
        : ""}
    </div>
  );
}
