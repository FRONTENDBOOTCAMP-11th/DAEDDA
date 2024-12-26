export default function PRWrite() {
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
              className="mt-1 block w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            />
          </div>

          <fieldset className="mt-7">
            <label htmlFor="address" className="text-[16px] font-bold mb-2">
              위치
            </label>
            <div className="max-w-screen-sm h-24 bg-slate-500 mb-7 rounded-lg flex items-center justify-center">
              지도
            </div>
            <input
              type="text"
              id="address"
              placeholder="상세 주소"
              className="mt-1 block w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            />
          </fieldset>

          <fieldset className="mt-7">
            <label htmlFor="phoneNum" className="text-[16px] font-bold mb-2">
              휴대폰 번호
            </label>

            <input
              type="text"
              id="phoneNum"
              placeholder="휴대폰 번호"
              className="mt-1 block w-full h-12 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            />
          </fieldset>

          <fieldset className="mt-7">
            <label htmlFor="career" className="text-[16px] font-bold mb-2">
              상세경력
            </label>

            <textarea
              id="career"
              rows="10"
              placeholder="알바 경력"
              className="mt-1 block w-full h-[120px] p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            ></textarea>
          </fieldset>

          <fieldset className="mt-7">
            <label htmlFor="appeal" className="text-[16px] font-bold mb-2">
              근무 조건
            </label>
            <textarea
              id="appeal"
              rows="10"
              placeholder="업무에 대한 자세한 설명"
              className="mt-1 block w-full h-[120px] p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:border-2"
            ></textarea>
          </fieldset>

          <div>
            <button
              type="submit"
              className="w-full mt-11 rounded-lg h-12 text-white font-bold bg-primary"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
