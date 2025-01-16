import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

// from employed 로직
const useEditProductState = () => {
  const axios = useAxiosInstance();

  return useMutation({
    mutationFn: async ({ productId, state }) => {
      return axios.patch(`/seller/products/${productId}`, {
        "extra.state": state,
      });
    },

    onSuccess: () => {
      console.log("product state 변경 완료");
    },

    onError: error => {
      console.error("등록 실패:", error);
    },
  });
};

export default useEditProductState;
