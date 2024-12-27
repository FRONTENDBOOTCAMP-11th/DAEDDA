export default function Terms() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-full bg-slate-300">
        <img
          src="/src/pages/user/logo.png"
          className="max-w-full h-[100px] mb-24"
        />
      </div>
      <h1 className="text-[32px] mb-6">환영합니다!</h1>
      <p className="font-light text-xs mb-6">
        약관에 동의 하셔야 회원 가입이 가능합니다.
      </p>
      <p>약관 동의</p>
      <div className="">
        <input
          type="checkbox"
          id="check-all"
          className="accent-primary border-primary"
        ></input>
        <label htmlFor="check-all">전체 동의</label>
      </div>
      <div className="">
        <input
          type="checkbox"
          id="check-all"
          className="accent-primary border-primary"
        ></input>
        <label htmlFor="check-all">(필수) 서비스 이용 약관 동의</label>
      </div>
      <div className="">
        <input
          type="checkbox"
          id="check-all"
          className="accent-primary border-primary"
        ></input>
        <label htmlFor="check-all">(필수) 서비스 이용 약관 동의</label>
      </div>
      <p>* 미동의 텍스트</p>
      <button></button>
      <button></button>
    </div>
  );
}
