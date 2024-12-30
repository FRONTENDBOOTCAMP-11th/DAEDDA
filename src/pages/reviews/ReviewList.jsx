import { NavLink, Outlet } from "react-router-dom";

export default function ReviewList() {
  return (
    <div className="mb-[80px]">
      <div className="flex *:py-2 *:flex-1 text-center font-semibold text-sm mb-5">
        <NavLink
          to="myPlace"
          className={({ isActive }) =>
            isActive ? "border-b-[3px] border-primary" : "text-gray-500"
          }
        >
          내가 일한 장소
        </NavLink>
        <NavLink
          to="myPerson"
          className={({ isActive }) =>
            isActive ? "border-b-[3px] border-primary" : "text-gray-500"
          }
        >
          나 대신 일하는 사람
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
