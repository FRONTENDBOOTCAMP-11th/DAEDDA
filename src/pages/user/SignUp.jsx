export default function SignUp() {
  return (
    // 화면 전체 가운데 정렬, 640px
    <div className="max-w-screen-sm h-screen m-auto bg-slate-400">
      {/* 내부의 모든 요소들 세로로 */}
      <div className="flex flex-col items-center justify-center">
        <img
          src="/src/assets/images/smiling_daeddamon.png"
          className="w-[150px] h-[150px]"
        />
        <button className="py-2 px-[14px] mt-2 bg-primary rounded-lg text-white text-sm mb-3">
          이미지 선택
        </button>

        <input
          type="email"
          placeholder="이메일을 입력해주세요."
          className="w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary"
          maxLength="30"
        />
        <p className="self-start mt-2 mb-2 text-xs text-red">
          이메일을 입력해주세요.
        </p>

        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          className="w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary"
          maxLength="30"
        />
        <p className="self-start mt-2 mb-2 text-xs text-red">
          닉네임을 입력해주세요.
        </p>

        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          className="w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary"
          maxLength="30"
        />
        <p className="self-start mt-2 mb-2 text-xs text-red">
          비밀번호를 입력해주세요.
        </p>

        <input
          type="password"
          placeholder="비밀번호를 확인해주세요."
          className="w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary"
          maxLength="30"
        />
        <p className="self-start mt-2 mb-2 text-xs text-red">
          비밀번호를 확인해주세요.
        </p>

        <input
          type="date"
          className="w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary text-gray-400"
          maxLength="30"
        />
        <p className="self-start mt-2 mb-2 text-xs text-red">
          생년월일을 입력해주세요.
        </p>

        <input
          type="tel"
          placeholder="휴대폰 번호를 입력해주세요."
          className="w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary"
          maxLength="30"
        />
        <p className="self-start mt-2 mb-2 text-xs text-red">
          휴대폰 번호를 입력해주세요.
        </p>
      </div>
    </div>
  );
}
