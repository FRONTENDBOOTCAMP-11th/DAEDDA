import { useMatch, useNavigate } from "react-router-dom";

export default function Footer() {
  const [active, setActive] = useState("home");
  const navigate = useNavigate();

  const mainPage = useMatch("/");
  const myPage = useMatch("myPage");
  const myPageLikeList = useMatch("myPage/likeList");
  const review = useMatch("review");
  const reviewMyPlace = useMatch("review/myPlace");
  const reviewMyPerson = useMatch("review/myPerson");

  const footerMatch =
    mainPage ||
    myPage ||
    myPageLikeList ||
    review ||
    reviewMyPlace ||
    reviewMyPerson;

  const tabs = [
    {
      name: "home",
      icon: "/icons/footer/home.svg",
      activeIcon: "/icons/footer/purpleHome.svg",
      label: "홈",
      path: "/",
      match: mainPage,
    },
    {
      name: "likeList",
      icon: "/icons/footer/heart.svg",
      activeIcon: "/icons/footer/purpleHeart.svg",
      label: "찜 목록",
      path: "/myPage/likeList",
      match: myPageLikeList,
    },
    {
      name: "review",
      icon: "/icons/footer/history.svg",
      activeIcon: "/icons/footer/purpleHistory.svg",
      label: "알바 내역",
      path: "/review",
      match: review || reviewMyPerson || reviewMyPlace,
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

  return (
    <div className="flex justify-between items-center h-[60px] px-12 screen-425:px-0 border-gray-100 border-t-2">
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
