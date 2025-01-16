import { useMatch, useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const mainPage = useMatch("/");
  const myPage = useMatch("myPage");
  const history = useMatch("history");
  const historyWorked = useMatch("history/worked");
  const historyEmployed = useMatch("history/employed");

  const footerMatch =
    mainPage || myPage || history || historyWorked || historyEmployed;

  const tabs = [
    {
      name: "history",
      icon: "/icons/footer/history.svg",
      activeIcon: "/icons/footer/purpleHistory.svg",
      label: "알바 내역",
      path: "/history",
      match: history || historyWorked || historyEmployed,
    },
    {
      name: "home",
      icon: "/icons/footer/home.svg",
      activeIcon: "/icons/footer/purpleHome.svg",
      label: "홈",
      path: "/",
      match: mainPage,
    },
    {
      name: "profile",
      icon: "/icons/footer/profile.svg",
      activeIcon: "/icons/footer/purpleProfile.svg",
      label: "마이 페이지",
      path: "/myPage",
      match: myPage,
    },
  ];

  if (footerMatch) {
    return (
      <div className="fixed left-1/2 bottom-0 flex w-full h-[60px] bg-white -translate-x-1/2 max-w-screen-sm cursor-pointer z-20">
        {tabs.map(tab => (
          <div
            key={tab.name}
            className="flex-1 flex justify-end flex-col items-center"
            onClick={() => {
              navigate(tab.path);
            }}
          >
            <img
              className="size-6 mb-[2px]"
              src={tab.match ? tab.activeIcon : tab.icon}
              alt={tab.name}
            />
            <h3
              className={`mb-[9px] text-[10px] ${
                tab.match ? "text-primary" : "text-gray-500"
              } transition-all duration-100`}
            >
              {tab.label}
            </h3>
          </div>
        ))}
      </div>
    );
  }
}
