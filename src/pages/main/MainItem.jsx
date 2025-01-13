import Button from "@components/Button";
import useAxiosInstance from "@hooks/useAxiosInstance";
import Badge from "@pages/main/Badge";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function MainItem() {
  const axios = useAxiosInstance();
  const navigate = useNavigate();

  const { _id } = useParams();
  const { data: product, refetch } = useQuery({
    queryKey: ["product", _id],
    queryFn: () => axios.get(`/seller/products/${_id}`),
    select: res => {
      return res.data.item;
    },
  });

  const [selectState, setSelectState] = useState(null);

  const changePostState = useMutation({
    mutationFn: async ({ orderId, productId, newState }) => {
      const body = { state: newState };
      return axios.patch(
        `/seller/orders/${orderId}/products/${productId}`,
        body,
      );
    },
    onSuccess: () => {
      refetch();
    },
  });

  const changeOrderState = useMutation({
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

  const handleChangeState = async (productId, orderId) => {
    const postState = "EM020";
    const orderState = "WO020";
    setSelectState(orderId);

    try {
      await changePostState.mutateAsync({
        productId,
        orderId,
        newState: postState,
      });
      await changeOrderState.mutateAsync({ orderId, newState: orderState });
    } catch (error) {
      console.error("상태 변화 오류", error);
    }
  };

  const handleCancelState = async (productId, orderId) => {
    const postState = "EM010";
    const orderState = "WO010";
    setSelectState(null);

    try {
      await changePostState.mutateAsync({
        orderId,
        productId,
        newState: postState,
      });
      await changeOrderState.mutateAsync({ orderId, newState: orderState });
    } catch (error) {
      console.error("상태변화 오류", error);
    }
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
                          handleCancelState(
                            product?._id,
                            order._id,
                            order.state,
                          )
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
                          selectState === null || selectState === order._id
                            ? handleChangeState(product?._id, order._id)
                            : null
                        }
                        disabled={
                          selectState !== null && selectState !== order._id
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
