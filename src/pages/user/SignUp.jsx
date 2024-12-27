import Button from "@components/layout/Button";

export default function SignUp() {
  return (
    <div className="max-w-screen-sm h-screen m-auto">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/src/assets/images/smiling_daeddamon.png"
          className="w-[150px] h-[150px]"
        />
        <Button color="purple" width="">
          이미지 선택
        </Button>
        {/* <button className="py-2 px-[14px] mt-2 bg-primary rounded-lg text-white text-sm mb-3 font-bold test-sm">
          이미지 선택
        </button> */}

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

        <div className="flex gap-6 w-full">
          <button className="border border-primary rounded-lg h-[48px] flex-1 items-center justify-center mb-2 text-sm text-primary font-bold text-lg">
            취소
          </button>
          <button className="bg-primary border-none rounded-lg h-[48px] flex-1 flex items-center justify-center mb-2 text-sm text-white font-bold text-lg">
            계속
          </button>
        </div>
      </div>
    </div>
  );
}
