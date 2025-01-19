import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

const useEditProductWorker = () => {
  const axios = useAxiosInstance();

  return useMutation({
    mutationFn: async ({ productId, userId, orderId }) => {
      return axios.patch(`/seller/products/${productId}`, {
        "extra.worker.userId": userId,
        "extra.worker.orderId": orderId,
      });
    },

    onSuccess: response => {
      console.log(response);
      console.log("product state 변경 완료");
    },

    onError: error => {
      console.error("등록 실패:", error);
    },
  });
};

export default useEditProductWorker;
