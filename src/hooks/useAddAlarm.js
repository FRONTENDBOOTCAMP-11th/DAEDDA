import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

const useAddAlarm = () => {
  const axios = useAxiosInstance();

  return useMutation({
    mutationFn: async ({ targetId, content, extra }) => {
      const body = {
        target_id: targetId,
        content: content, // 호출 시 전달받은 content 사용
        extra: extra, // 호출 시 전달받은 extra 사용
      };
      return axios.post("/notifications/", body);
    },
    onSuccess: response => {
      console.log(response);
    },
  });
};

export default useAddAlarm;
