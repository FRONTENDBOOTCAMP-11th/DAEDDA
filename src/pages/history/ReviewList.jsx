import { NavLink, Outlet } from "react-router-dom";

export default function ReviewList() {
  return (
    <div className="mb-[80px]">
      <div className="flex *:py-2 *:flex-1 text-center font-semibold text-sm mb-5">
        <NavLink
          to="worked"
          className={({ isActive }) =>
            isActive ? "border-b-[3px] border-primary" : "text-gray-500"
          }
        >
          내가 한 일
        </NavLink>
        <NavLink
          to="hired"
          className={({ isActive }) =>
            isActive ? "border-b-[3px] border-primary" : "text-gray-500"
          }
        >
          내가 시킨 일
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
