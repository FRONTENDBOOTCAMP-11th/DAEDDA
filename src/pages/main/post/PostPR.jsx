import Button from "@components/Button";
import useAddAlarm from "@hooks/useAddAlarm";
import useAxiosInstance from "@hooks/useAxiosInstance";
import useEditProductState from "@hooks/useEditProductState";
import useEditProductWorker from "@hooks/useEditProductWorker";
import { useGetProductDetail } from "@hooks/useGetProductDetail";
import Badge from "@pages/main/post/Badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function PostPR({ workPrice, workDate }) {
  const axios = useAxiosInstance();
  const navigate = useNavigate();
  const { _id } = useParams();
  const { data: product, refetch } = useGetProductDetail(_id);
  const addAlarm = useAddAlarm();
  const queryClient = useQueryClient();

  const editProductState = useEditProductState();
  const editProductWorker = useEditProductWorker();
  const changeOrderState = useMutation({
    mutationFn: async ({ orderId, newState }) => {
      const body = { state: newState };
      console.log(body);
      return axios.patch(`/seller/orders/${orderId}`, body);
    },

    onSuccess: (_, variables) => {
      const { newState, userId } = variables;

      let notificationContent;
      if (newState === "WO020")
        notificationContent = `🎉 지원하신 "${product.name}" 에 채택이 되었습니다.`;
      else
        notificationContent = `😭 지원하신 "${product.name}" 에 채택이 취소되었습니다.`;

      addAlarm.mutateAsync({
        targetId: userId,
        content: notificationContent,
        extra: { title: product.extra.condition.company },
      });
      refetch();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["product", product._id] });
    },
  });

  const handleUserPage = userId => {
    navigate(`/user/${userId}`);
  };

  const handleChangeState = order => {
    const isOk = confirm("정말 이 지원자를 채택하시겠습니까?");
    if (isOk) {
      const newState = "WO020";
      changeOrderState.mutate({
        orderId: order._id,
        newState,
        userId: order.user_id,
      });
      editProductState.mutate({
        productId: product._id,
        state: "EM020",
      });
      editProductWorker.mutate({
        productId: product._id,
        state: "EM020",
        orderId: order._id,
        userId: order.user._id,
      });
    }
  };

  const handleCancelState = order => {
    const updatedAtDate = new Date(order?.updatedAt);
    const currentDate = new Date();
    const workStartDate = new Date(workDate);
    const oneDayBeforeWork = new Date(workStartDate);
    oneDayBeforeWork.setDate(workStartDate.getDate() - 1);

    const diffFromUpdated = Math.ceil(
      Math.abs(currentDate - updatedAtDate) / (1000 * 60 * 60 * 24),
    );

    const diffToWork = Math.ceil(
      (workStartDate - currentDate) / (1000 * 60 * 60 * 24),
    );

    let refundRate;
    let refundMessage;

    if (diffFromUpdated <= 5) {
      refundRate = 100;
      refundMessage = `📌 채택 후 ${diffFromUpdated}일, 당일 100% 환불\n`;
    } else if (diffFromUpdated === 1 && diffToWork >= 5) {
      refundRate = 50;
      refundMessage = `📌 채택 후 5일 이후 ~ 근무일 1일 전 취소: 50% 환불\n`;
    } else if (currentDate >= oneDayBeforeWork) {
      refundRate = 0;
      refundMessage = `📌 근무일 당일 취소: 환불 불가능\n`;
    }

    const refundAmount = (Number(workPrice) * refundRate) / 100;

    const isOk = confirm(
      `정말 채택을 취소하시겠습니까?\n\n` +
        `일당 환불 규정:\n${refundMessage}\n` +
        `💰 환불 예정 금액: ${refundAmount.toLocaleString()} 원\n\n` +
        `🔥 유의 사항\n` +
        `이에 동의하시면 ✅ 확인 버튼\n` +
        `거절하시려면 ❌ 취소 버튼을 눌러주시길 바랍니다.\n` +
        `채택 취소 시 환불은 영업일 기준 3~4일 소요될 수 있습니다.`,
    );

    if (isOk) {
      const newState = "WO010";
      changeOrderState.mutate({
        orderId: order._id,
        newState,
        userId: order.user_id,
      });
      editProductState.mutate({
        productId: product._id,
        state: "EM010",
        orderId: order._id,
        userId: order.user._id,
      });
      editProductWorker.mutate({
        productId: product._id,
        state: "EM010",
        orderId: null,
        userId: null,
      });
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
                    className="w-16 h-16 rounded-full object-cover"
                    alt={`${order?.user.name} 프로필 이미지`}
                  />
                  <div className="flex flex-col">
                    <div className="flex">
                      <h2 className="font-bold mr-1">{order?.user.name}</h2>
                      <Badge key={order?.user?._id} userId={order?.user?._id} />
                    </div>
                    <h2 className="font-light">{order?.updatedAt}</h2>
                  </div>
                </div>
              </section>

              <section className="break-keep whitespace-normal">
                <div className="font-bold mt-7">제목</div>
                <div className="mt-2 break-words">{order?.extra?.title}</div>

                <div className="font-bold mt-7">휴대폰 번호</div>
                <div className="mt-2 break-words">{order?.user.phone}</div>

                <div className="font-bold mt-7">자신을 표현해주세요!</div>
                <div className="mt-2 break-words">{order?.extra?.content}</div>

                <div className="flex flex-col justify-center my-10">
                  {order.state === "WO020" ? (
                    <div className="w-full">
                      <Button
                        color="red"
                        width="xl"
                        height="lg"
                        onClick={() => handleCancelState(order)}
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
                        onClick={() => handleChangeState(order)}
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
