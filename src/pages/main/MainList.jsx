export default function MainList() {
  return (
    <div>
      <div className="flex justify-between items-center text-[24px] font-semibold py-[23px]">
        <p>동래구 중앙대로 1473번길 14-2</p>
        <div className="flex gap-4">
          <img src="/icons/search.svg" />
          <img src="/icons/mapPin.svg" />
        </div>
      </div>

      <div className="py-[14px] flex gap-4 mb-5">
        <div>
          <label htmlFor="time" className="mr-[16px] font-[700] ">
            시간
          </label>
          <select className="ring-2 ring-gray-400 focus:ring-primary py-[9px] px-3 rounded-xl">
            <option>0 ~ 4시간</option>
            <option>4 ~ 10시간</option>
            <option>10시간 이상</option>
          </select>
        </div>
        <div>
          <label htmlFor="time" className="mr-[16px] font-[700] ">
            급여
          </label>
          <select className="ring-2 ring-gray-400 focus:ring-primary py-[9px] px-3 rounded-xl">
            <option>시급 10,000원 이하</option>
            <option>시급 10,000원 이상</option>
          </select>
        </div>
      </div>

      <div></div>
    </div>
  );
}
