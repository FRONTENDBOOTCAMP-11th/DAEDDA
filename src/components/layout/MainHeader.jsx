export default function MainHeader() {
  return (
    <header className="w-full h-[60px] flex items-center justify-between fixed top-0 left-0 bg-white px-6">
      <img src="/src/assets/logos/header-logo.png" className="w-[190px]" />
      <div className="flex items-center gap-4">
        <img src="/icons/alarm.svg" />
        <img src="/icons/hamburger.svg" className="w-6" />
      </div>
    </header>
  );
}
