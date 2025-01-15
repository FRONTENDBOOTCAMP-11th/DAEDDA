import Button from "@components/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useGetDetailedProduct } from "@hooks/useGetDetailedProduct";
import Badge from "@pages/main/Badge";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function PostPR() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const { _id } = useParams();

  const { data: product, refetch } = useGetDetailedProduct(_id);

  const changeState = useMutation({
    mutationFn: async ({ orderId, newState }) => {
      const body = { state: newState };
      return axios.patch(`/seller/orders/${orderId}`, body);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleUserPage = userId => {
    navigate(`/user/${userId}`);
  };

  const handleChangeState = orderId => {
    const newState = "WO020";
    changeState.mutate({ orderId, newState });
  };

  const handleCancelState = orderId => {
    const newState = "WO010";
    changeState.mutate({ orderId, newState });
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
                    src={
                      order?.user.image
                        ? order?.user.image.includes("kakaocdn.net")
                          ? order?.user.image
                          : `https://11.fesp.shop/${order?.user.image}`
                        : "/images/smiling_daeddamon.png"
                    }
                    // src={`https://11.fesp.shop/${order?.user.image}`}
                    className="w-16 h-16 rounded-full"
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
                  {order.state === "WO020" ? (
                    <div className="w-full">
                      <Button
                        color="red"
                        width="xl"
                        height="lg"
                        onClick={() =>
                          handleCancelState(order._id, order.state)
                        }
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
                        onClick={() =>
                          handleChangeState(order._id, order.state)
                        }
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
