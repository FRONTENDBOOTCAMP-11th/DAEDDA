import Button from "@components/layout/Button";

export default function Terms() {
  return (
    <div className="flex flex-col mb-[40px]">
      <div className="flex justify-center w-full">
        <img
          src="/src/assets/logos/logo.png"
          className="max-w-full h-[70px] mb-6"
        />
      </div>
      <h1 className="text-[32px] mb-6">환영합니다!</h1>
      <p className="font-light text-xs mb-6">
        약관에 동의 하셔야 회원 가입이 가능합니다.
      </p>

      <form>
        <p className="text-[16px] font-bold">약관 동의</p>
        <div className="flex gap-6 items-center py-5 border-b-2">
          <input
            type="checkbox"
            id="check-all"
            className="accent-primary border-primary w-5 h-5"
          ></input>
          <label htmlFor="check-all" className="font-semibold text-base">
            전체 동의
          </label>
        </div>
        <div className="flex items-center gap-6 py-5">
          <input
            type="checkbox"
            id="check-all"
            className="accent-primary border-primary w-5 h-5"
          ></input>
          <label htmlFor="check-all" className="text-base">
            <strong>(필수)</strong> 서비스 이용 약관 동의
          </label>
        </div>
        <div className="flex items-center gap-6 py-5">
          <input
            type="checkbox"
            id="check-all"
            className="accent-primary border-primary w-5 h-5"
          ></input>
          <label htmlFor="check-all" className="text-base">
            <strong>(필수)</strong> 서비스 이용 약관 동의
          </label>
        </div>
        <p className="my-5 text-red">* 미동의 텍스트</p>
        <Button color="purple" height="lg" className="mb-2 w-full">
          계속
        </Button>
        <Button color="white" height="lg">
          취소
        </Button>
      </form>
    </div>
  );
}
