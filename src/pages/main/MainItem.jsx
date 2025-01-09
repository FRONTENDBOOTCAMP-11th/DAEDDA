import Button from "@components/layout/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import Badge from "@pages/main/Badge";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MainItem() {
  const [accept, setAccept] = useState(null);
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const { _id } = useParams();
  const { data: product } = useQuery({
    queryKey: ["product", _id],
    queryFn: () => axios.get(`/seller/products/${_id}`),
    select: res => {
      return res.data.item;
    },
  });

  const handleUserPage = userId => {
    navigate(`/user/${userId}`);
  };

  const handleAccept = userId => {
    if (accept === userId) {
      setAccept(null);
    } else {
      setAccept(userId);
    }
  };

  const handleCancel = () => {
    setAccept(null);
  };

  const filteredOrders = product?.orders?.filter(order =>
    order.extra?.title?.trim(),
  );

  return (
    <div>
      {filteredOrders && filteredOrders.length > 0
        ? filteredOrders.map(order => (
            <div key={order?._id}>
              <section className="mt-7 pt-7 flex justify-between border-t-8">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => handleUserPage(order?.user?._id)}
                >
                  <img
                    src={`https://11.fesp.shop/${order?.user.image}`}
                    className="w-16 h-16"
                    alt={`${order?.user.name} 프로필 이미지`}
                  />
                  <div className="flex flex-col">
                    <div className="flex">
                      <h2 className="font-bold mr-1">{order?.user.name}</h2>
                      <Badge number={70} />
                    </div>
                    <h2 className="font-light">{order?.updatedAt}</h2>
                  </div>
                </div>
              </section>

              <section className="break-keep whitespace-normal">
                <div className="font-bold mt-7">제목</div>
                <div className="mt-2">{order?.extra?.title}</div>

                <div className="font-bold mt-7">휴대폰 번호</div>
                <div className="mt-2">{order?.user.phone}</div>

                <div className="font-bold mt-7 ">자신을 표현해주세요!</div>
                <div className="mt-2">{order?.extra?.content}</div>

                <div className="flex flex-col justify-center my-10">
                  {accept === order?.user?._id ? (
                    <div className="w-full">
                      <Button
                        color="red"
                        width="xl"
                        height="lg"
                        onClick={handleCancel}
                      >
                        취소
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full">
                      <Button
                        color="purple"
                        width="xl"
                        height="lg"
                        onClick={() => handleAccept(order?.user?._id)}
                        disabled={accept !== null && accept}
                      >
                        채택
                      </Button>
                    </div>
                  )}
                </div>
              </section>
            </div>
          ))
        : ""}
    </div>
  );
}
