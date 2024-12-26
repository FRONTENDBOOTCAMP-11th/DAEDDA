export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <img src="/src/assets/logos/header-logo.png" className="mt-8 h-[70px]" />
      <img
        src="/src/assets/images/daeddamon.png"
        className="my-7 w-[180px] h-[180px]"
      />

      <input
        type="email"
        placeholder="이메일"
        className="w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary"
        maxLength="30"
      />
      <p className="self-start mt-2 mb-2 text-xs text-red">
        이메일을 입력해주세요.
      </p>

      <div className="relative w-full">
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary"
          maxLength="20"
        />
        <img
          src="/public/icons/eyeHalf.svg"
          className="absolute right-3 top-3"
        />
      </div>
      <p className="self-start mt-2 mb-2 text-xs text-red">
        비밀번호를 입력해주세요.
      </p>

      <button className="bg-primary border-none rounded-lg h-[60px] w-full flex items-center justify-center mb-2 text-sm text-white">
        로그인
      </button>
      <button className="bg-yellow-100 border-none rounded-lg h-[60px] w-full flex items-center justify-center relative">
        <img
          src="/public/icons/kakao.svg"
          className="absolute left-4 w-6 h-6"
        />
        <span className="text-black text-sm">카카오 로그인</span>
      </button>

      <div className="flex items-center justify-center gap-2 mt-2">
        <p className="font-bold text-sm">대타를 찾고 있다면?</p>
        <a href="#" className="underline text-sm">
          회원가입
        </a>
      </div>
    </div>
  );
}
