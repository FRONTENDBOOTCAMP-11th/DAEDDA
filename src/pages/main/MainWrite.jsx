export default function MainWrite() {
  return (
    <div className="min-h-screen">
      <div className="w-full">
        <form className="max-w-screen-sm purple-100">
          <div className="mt-5">
            <label htmlFor="subject" className="text-[16px] font-bold mb-2">
              제목
            </label>
            <input
              type="text"
              id="subject"
              placeholder="제목"
              className="mt-1 block w-full h-12 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            />
          </div>

          <fieldset className="mt-7">
            <legend className="text-[16px] font-bold mb-2">위치</legend>
            <div className="w-full max-w-screen-sm h-24 bg-slate-500 mb-7 rounded-lg flex items-center justify-center">
              지도
            </div>
            <input
              type="text"
              id="address"
              placeholder="상세 주소"
              className="mt-1 block w-full h-12 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            />
          </fieldset>

          <fieldset className="mt-7">
            <legend className="text-[16px] font-bold mb-2">근무 조건</legend>
            <input
              type="text"
              id="brand"
              placeholder="가게 이름"
              aria-label="가게 이름"
              className="mt-1 block w-full h-12 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            />

            <input
              type="number"
              id="pay"
              placeholder="급여"
              aria-label="급여"
              className="mt-7 block w-full h-12 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            />

            <input
              type="text"
              id="timeInput"
              aria-label="근무 시간"
              placeholder="근무 시간은 00:00 - 00:00 형식으로 작성해주세요."
              className="mt-7 block w-full h-12 pl-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            />

            <div>
              <input
                type="date"
                id="dateInput"
                aria-label="근무 날짜"
                className="mt-7 block w-full h-12 pl-3 pr-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary text-gray-400 focus:border-2"
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="text-[16px] font-bold mb-2">근무 내용</legend>
            <textarea
              id="workCondition"
              rows="10"
              placeholder="업무에 대한 자세한 설명"
              className="mt-1 block w-full h-[120px] p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            ></textarea>
          </fieldset>

          <div>
            <button
              type="submit"
              className="w-full mt-11 rounded-lg h-12 text-white font-bold bg-[#8C6FEE]"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
