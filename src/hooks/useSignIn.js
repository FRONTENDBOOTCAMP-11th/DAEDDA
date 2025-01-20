import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";
import useUserStore from "@zustand/userStore";
import { useNavigate } from "react-router-dom";

export default function useSignIn() {
  const axios = useAxiosInstance();
  const setUser = useUserStore(store => store.setUser);
  const navigate = useNavigate();

  const signIn = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post(`/users/login`, { email, password });
      return response.data.item;
    },
    onSuccess: user => {
      setUser({
        _id: user._id,
        name: user.name,
        phone: user.phone,
        image: user.image,
        accessToken: user.token.accessToken,
        refreshToken: user.token.refreshToken,
        extra: {
          birthday: user.extra?.birthday,
        },
      });
      navigate("/");
    },
    onError: error => {
      console.error("로그인 실패: ", error.response);
    },
  });
  return signIn;
}
