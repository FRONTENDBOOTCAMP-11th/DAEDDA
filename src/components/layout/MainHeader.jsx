export default function MainHeader() {
  return (
    <header className="w-full h-[60px] flex items-center justify-between mb-5">
      <img src="/src/assets/logos/header-logo.png" className="w-[190px] ml-1" />
      <div className="flex items-center gap-4">
        <img src="/icons/alarm.svg" />
        <img src="/icons/hamburger.svg" className="w-6" />
      </div>
    </header>
  );
}
