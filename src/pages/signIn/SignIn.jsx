export default function SignIn() {
  return (
    // 화면 전체 가운데 정렬, 640px
    <div className="max-w-screen-sm bg-slate-400 h-screen m-auto">
      {/* 내부의 모든 요소들 세로로 */}
      <div className="flex flex-col items-center justify-center">
        {/* 로고 */}
        <img src="logo_txt.png" className="mt-6 h-[70px]" />
        <img src="logo.png" className="mt-5 mb-5 w-[180px] h-[180px]" />

        {/* input 요소 */}
        <input
          type="email"
          placeholder="이메일"
          className="w-full h-[48px] p-3 border border-black rounded-lg"
        />
        <p className="self-start mt-2 mb-2">이메일을 입력해주세요.</p>
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full h-[48px] p-3 border border-black rounded-lg"
        />
        <p className="self-start mt-2 mb-2">비밀번호를 입력해주세요.</p>

        {/* 버튼 */}
        <button className="bg-primary text-white border-none rounded-lg h-[60px] w-full flex items-center justify-center mb-2">
          로그인
        </button>
        <button className="bg bg-yellow-100 text-white border-none rounded-lg h-[60px] w-full flex items-center justify-center relative">
          <img src="kakao.svg" className="absolute left-4 w-6 h-6" />
          <span>카카오 로그인</span>
        </button>

        <div className="flex items-center justify-center gap-2 mt-2">
          <p className="font-bold">대타를 찾고 있다면?</p>
          <a href="#" className="underline">
            회원가입
          </a>
        </div>
      </div>
    </div>
  );
}
