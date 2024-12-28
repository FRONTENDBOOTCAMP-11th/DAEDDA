import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const [active, setActive] = useState("home");
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
      icon: "/icons/footer/heart.svg",
      activeIcon: "/icons/footer/purpleHeart.svg",
      label: "찜 목록",
      path: "/myPage/likeList",
    },
    {
      name: "review",
      icon: "/icons/footer/history.svg",
      activeIcon: "/icons/footer/purpleHistory.svg",
      label: "알바 내역",
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
    <div className="fixed left-0 bottom-0 flex w-full h-[60px] bg-white">
      {tabs.map(tab => (
        <div
          key={tab.name}
          className="flex-1 flex justify-end flex-col items-center"
          onClick={() => {
            setActive(tab.name);
            navigate(tab.path);
          }}
        >
          <img
            className="size-6 mb-[2px]"
            src={active === tab.name ? tab.activeIcon : tab.icon}
            alt={tab.name}
          />
          <h3
            className={`mb-[9px] text-[10px] ${
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
