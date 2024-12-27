import InputField from "@components/layout/InputField";

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

      <div className="flex flex-col gap-5">
        <div className="flex justify-between shadow-custom-shadow rounded-3xl px-4 py-[22px] items-center">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-[20px]">
              기장대게 할인마트 홀 서빙 대타 구함!
            </h3>
            <p className="font-semibold text-gray-500">
              기장대게할인마트ㆍ민락동 ㆍ 1시간 전
            </p>
            <h3 className="text-[20px] font-bold text-purple-900">
              90,000원ㆍ시급 15,000원
            </h3>
            <p className="font-semibold">12/19 목ㆍ10:00 ~ 16:00ㆍ6시간</p>
          </div>
          <div className="flex-shrink-0">
            <img
              className="size-[136px]"
              src="/src/assets/images/main-sample.png"
            />
          </div>
        </div>
        <div className="flex justify-between shadow-custom-shadow rounded-3xl px-4 py-[22px] items-center">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-[20px]">
              기장대게 할인마트 홀 서빙 대타 구함!
            </h3>
            <p className="font-semibold text-gray-500">
              기장대게할인마트ㆍ민락동 ㆍ 1시간 전
            </p>
            <h3 className="text-[20px] font-bold text-purple-900">
              90,000원ㆍ시급 15,000원
            </h3>
            <p className="font-semibold">12/19 목ㆍ10:00 ~ 16:00ㆍ6시간</p>
          </div>
          <div className="flex-shrink-0">
            <img
              className="size-[136px]"
              src="/src/assets/images/main-sample.png"
            />
          </div>
        </div>
        <div className="flex justify-between shadow-custom-shadow rounded-3xl px-4 py-[22px] items-center">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-[20px]">
              기장대게 할인마트 홀 서빙 대타 구함!
            </h3>
            <p className="font-semibold text-gray-500">
              기장대게할인마트ㆍ민락동 ㆍ 1시간 전
            </p>
            <h3 className="text-[20px] font-bold text-purple-900">
              90,000원ㆍ시급 15,000원
            </h3>
            <p className="font-semibold">12/19 목ㆍ10:00 ~ 16:00ㆍ6시간</p>
          </div>
          <div className="flex-shrink-0">
            <img
              className="size-[136px]"
              src="/src/assets/images/main-sample.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
