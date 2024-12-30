import Button from "@components/layout/Button";

export default function MainDetail() {
  return (
    <div className="mb-[40px]">
      <section className="flex items-center justify-between h-[60px] mt-4">
        <div className="font-bold text-[16px] py-4 sm:whitespace-normal md:whitespace-nowrap">
          [채용중]카카오에서 프론트엔드 개발자 구합니다
        </div>
        <img
          src="/icons/reviews/reviewBlankLike.svg"
          className="h-7 w-7 ml-2"
          alt="찜 아이콘"
        />
      </section>

      <section className="flex items-center h-20 shadow-custom-shadow rounded-3xl mt-6 p-3">
        <img
          src="/src/assets/images/daeddamon.png"
          className="w-11 h-11 ml-3"
          alt="스마일 대따몬"
        />
        <h2 className="font-bold ml-5">닉네임</h2>
        <h2 className="font-light ml-5">2024/12/25</h2>
      </section>

      <section className="mt-7">
        <h2 className="font-bold mb-2">근무지 사진</h2>
        <div className="mt-2 mb-7 w-[136px] h-[136px] flex bg-slate-600 items-center justify-center rounded-lg cursor-pointer">
          <img
            src=""
            alt="업로드된 이미지"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <h2 className="font-bold mb-2">위치</h2>
        <div className="w-full h-40 bg-slate-600 rounded-lg"></div>
        <div className="mt-4 sm:whitespace-normal md:whitespace-nowrap">
          제주특별자치도 제주시 첨단로 242 (우)63309
        </div>
      </section>

      <div className="mt-7">
        <section>
          <h2 className="font-bold mb-2">근무 조건</h2>

          <div className="grid custom-375:grid-cols-1 grid-cols-2  gap-6">
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">카카오</h2>
            </article>
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">일급: 100,000원 + 중식비</h2>
            </article>
            <article className="flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">2024/12/25 목요일</h2>
            </article>
            <article className=" flex items-center justify-center h-20 shadow-custom-shadow rounded-lg p-3 text-center">
              <h2 className="">09:00~18:00</h2>
            </article>
          </div>
        </section>

        <section className="flex p-5 items-center shadow-custom-shadow rounded-3xl mt-6">
          <div>
            <h2 className="font-bold ml-3">근무 내용</h2>
            <ul className="list-disc ml-8 mt-2">
              <li>카카오 프렌즈 홈페이지 UI 작업</li>
              <li>카카오뱅크 신사업 분야의 프론트엔드 개발과 운영</li>
              <li>서비스 운영도구 개발 및 관리 효율화 업무</li>
              <li>채용시 연락</li>
            </ul>
          </div>
        </section>

        <div className="mt-7">
          <Button color="purple" height="lg" type="submit">
            지원하기
          </Button>
        </div>

        <div className="my-4 border-t border-gray-200">
          <div className="flex items-center mt-7 justify-between flex-wrap ">
            <section className="flex items-center ml-3">
              <img
                src="/src/assets/images/smiling_daeddamon.png"
                className="w-12 h-12"
                alt="스마일 대따몬"
              />
              <div className="ml-3 flex flex-col">
                <div className="flex items-center">
                  <h2 className="font-bold ml-5">닉네임</h2>
                  <h2 className="flex font-light ml-5">2024/12/25</h2>
                </div>
                <div className="flex items-center ml-5">
                  <img
                    src="/icons/reviews/star.svg"
                    className="w-5 h-5 mt-1"
                    alt="star"
                  />
                  <img
                    src="/icons/reviews/star.svg"
                    className="w-5 h-5 mt-1"
                    alt="star"
                  />
                  <img
                    src="/icons/reviews/star.svg"
                    className="w-5 h-5 mt-1"
                    alt="star"
                  />
                  <img
                    src="/icons/reviews/star.svg"
                    className="w-5 h-5 mt-1"
                    alt="star"
                  />
                  <img
                    src="/icons/reviews/star.svg"
                    className="w-5 h-5 mt-1"
                    alt="star"
                  />
                  <div className="font-bold text-xl ml-2 h-6">5</div>
                </div>
              </div>
            </section>
            <div className="flex justify-end gap-2 mt-5 h-[32px]">
              <div className="w-[92px]">
                <Button color="purple" width="xl" height="sm">
                  채택
                </Button>
              </div>
              <div className="w-[92px]">
                <Button color="red" width="2xl" height="sm">
                  취소
                </Button>
              </div>
            </div>
          </div>
          <section>
            <div className="font-bold mt-7">근무 조건</div>
            <div className="mt-2">
              카카오 프론트엔드 개발자 지원합니다! 열심히 하겠습니다.
            </div>

            <div className="font-bold mt-7">휴대폰 번호</div>
            <div className="mt-2">010-xxxx-xxxx</div>

            <div className="font-bold mt-7">상세 경력</div>
            <div className="mt-2">
              카카오 프론트엔드 개발자 지원합니다! 열심히 하겠습니다.
            </div>

            <div className="font-bold mt-7">자신을 표현해주세요!</div>
            <div className="mt-2">프로젝트에서 말하는 감자를 담당했습니다.</div>
          </section>
        </div>
      </div>
    </div>
  );
}
