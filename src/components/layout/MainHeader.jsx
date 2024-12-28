import { Link } from "react-router-dom";

export default function MainHeader() {
  return (
    <header className="w-full h-[60px] flex items-center justify-between fixed top-0 max-w-screen-sm left-1/2 -translate-x-1/2 bg-white px-6">
      <Link to="/">
        <img
          src="/src/assets/logos/header-logo.png"
          className="w-[190px] cursor-pointer"
        />
      </Link>
      <div className="flex items-center gap-4">
        <img src="/icons/alarm.svg" className="cursor-pointer" />
        <img src="/icons/hamburger.svg" className="w-6 cursor-pointer" />
      </div>
    </header>
  );
}
