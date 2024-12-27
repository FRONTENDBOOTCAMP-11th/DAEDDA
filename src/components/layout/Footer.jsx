import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [active, setActive] = useState();
  const navigate = useNavigate();

  const tabs = [
    {
      name: "home",
      icon: "/icons/footer/home.svg",
      activeIcon: "/icons/footer/purpleHome.svg",
      label: "홈",
      path: "/",
    },
    {
      name: "likeList",
      icon: "/icons/footer/likeList.svg",
      activeIcon: "/icons/footer/purpleLikeList.svg",
      label: "찜 목록",
      path: "/myPage/likeList",
    },
    {
      name: "review",
      icon: "/icons/footer/footerStar.svg",
      activeIcon: "/icons/footer/purpleStar.svg",
      label: "리뷰",
      path: "/review",
    },
    {
      name: "profile",
      icon: "/icons/footer/profile.svg",
      activeIcon: "/icons/footer/purpleProfile.svg",
      label: "마이 페이지",
      path: "/myPage",
    },
  ];

  return (
    <div className="flex justify-between items-center h-[60px] px-12 screen-425:px-0  border-gray-100 border-t-2">
      {tabs.map(tab => (
        <div
          key={tab.name}
          className="flex flex-col items-center cursor-pointer transition-all duration-100 flex-shrink-0"
          onClick={() => {
            setActive(tab.name);
            navigate(tab.path);
          }}
        >
          <img
            src={active === tab.name ? tab.activeIcon : tab.icon}
            alt={tab.name}
            className="w-[24px] h-[24px]"
          />
          <h3
            className={`text-[10px] whitespace-nowrap ${
              active === tab.name ? "text-primary" : "text-gray-500"
            } transition-all duration-100`}
          >
            {tab.label}
          </h3>
        </div>
      ))}
    </div>
  );
}
