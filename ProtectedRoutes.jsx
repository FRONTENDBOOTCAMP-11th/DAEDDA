import { Navigate, Outlet } from "react-router-dom";
import useUserStore from "@zustand/userStore";

const ProtectedRoute = () => {
  const user = useUserStore(state => state.user);

  if (!user) {
    alert("로그인 필요 - protected route");
    return <Navigate to="/user/signIn" replace={true} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
