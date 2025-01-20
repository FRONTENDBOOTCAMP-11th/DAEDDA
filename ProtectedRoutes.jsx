import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@zustand/userStore";

const ProtectedRoute = () => {
  const user = useUserStore(state => state.user);

  if (!user) {
    alert("로그인이 필요한 페이지입니다.");
    return <Navigate to="/user/signIn" replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
