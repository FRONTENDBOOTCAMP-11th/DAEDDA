import Button from "@components/Button";
import Badge from "@pages/main/Badge";

export default function PRDetail() {
  return (
    <div className="mb-[40px]">
      <section className="flex items-center justify-between flex-wrap">
        <h2 className="font-bold">
          카카오 프론트엔드 개발자 지원합니다. 열심히 하겠습니다.
        </h2>

        <div className="flex justify-end gap-2 mt-4 screen-530:justify-end screen-530:w-full ">
          <div className="w-[92px] h-[32px]">
            <Button color="purple" width="xl" height="sm">
              수정
            </Button>
          </div>

          <div className="w-[92px] h-[32px]">
            <Button color="red" width="2xl" height="sm">
              삭제
            </Button>
          </div>
        </div>
      </section>

      <section className="flex items-center shadow-custom-shadow rounded-3xl mt-6 p-3 flex-wrap screen-320:justify-center">
        <img
          src="/src/assets/images/smiling_daeddamon.png"
          className="w-11 h-11 ml-3 screen-320:ml-0"
          alt="스마일 대따몬"
        />
        <h2 className="font-bold ml-5 screen-320:ml-2">네이버</h2>
        <div className="w-fit screen-360:ml-2 ml-3">
          <Badge number={70} />
        </div>
        <h2 className="font-light ml-3 screen-320:ml-2">2024/12/25</h2>
      </section>

      <section className="mt-7">
        <h2 className="font-bold mb-2">근무지 정보</h2>
        <div className="w-full h-40 bg-slate-600 rounded-lg"></div>
        <div className="mt-4 sm:whitespace-normal md:whitespace-nowrap">
          제주특별자치도 제주시 첨단로 242 (우)63309
        </div>
      </section>

      <section className="flex p-5 items-center shadow-custom-shadow rounded-3xl mt-6">
        <div>
          <h2 className="font-bold">핸드폰 번호</h2>
          <h2 className="mt-2">010-xxxx-xxxx</h2>

          <h2 className="font-bold mt-7">상세 경력</h2>
          <h2 className="mt-2">
            네이버 프론트엔드 개발자로 일한 경력이 있습니다.
          </h2>

          <h2 className="font-bold mt-7">자신을 표현해주세요!</h2>
          <h2 className="mt-2">프로젝트에서 말하는 감자를 담당했습니다.</h2>
        </div>
      </section>
    </div>
  );
}
