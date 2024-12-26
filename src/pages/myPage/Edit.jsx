export default function Edit() {
  return (
    <>
      <div className=" border-gray-200 border-b mb-5">
        <img
          src="/src/assets/images/smiling_daeddamon.png"
          alt="프로필 이미지"
          className="size-32 m-auto "
        />
        <p className="bg-primary text-white max-w-[144px] px-6 py-2 rounded-md ml-auto  ">
          save change
        </p>
      </div>
      <div>
        <p className="text-base font-semibold mb-2">닉네임</p>
        <input
          className="w-full border-2 border-gray-300 p-3 h-12
          rounded-lg focus:border-secondary focus:border-2 focus:outline-none mb-2"
          type="text"
          placeholder="이메일을 입력해 주세요"
        />
        <p className="text-red text-xs mb-2">*미입력 알림 텍스트 부분</p>
      </div>
      <div>
        <p className="text-base font-semibold mb-2">이메일</p>
        <input
          className="w-full border-2 border-gray-300 p-3 h-12
          rounded-lg focus:border-primary focus:border-2 focus:outline-none mb-2"
          type="text"
          placeholder="아이디를 입력해 주세요"
        />
        <p className="text-red text-xs mb-2">*미입력 알림 텍스트 부분</p>
      </div>
      <div>
        <p className="text-base font-semibold mb-2">아이디</p>
        <input
          className="w-full border-2 border-gray-300 p-3 h-12
          rounded-lg focus:border-primary focus:border-2 focus:outline-none mb-2"
          type="text"
          placeholder="비밀번호를 입력해 주세요"
        />
        <p className="text-red text-xs mb-2">*미입력 알림 텍스트 부분</p>
      </div>
      <div>
        <p className="text-base font-semibold mb-2">Pw</p>
        <input
          className="w-full border-2 border-gray-300 p-3 h-12
          rounded-lg focus:border-primary focus:border-2 focus:outline-none mb-2"
          type="text"
          placeholder="닉네임을 입력해 주세요"
        />
        <p className="text-red text-xs mb-2">*미입력 알림 텍스트 부분</p>
      </div>
      <div>
        <p className="text-base font-semibold mb-2">생년월일</p>
        <input
          className="w-full border-2 border-gray-300 p-3 h-12
          rounded-lg focus:border-primary focus:outline-none 
          focus:border-2 mb-2 block
          placeholder-gray-400"
          type="text"
          placeholder=" 연도-월-일"
          onFocus={e => (e.target.type = "date")}
          onBlur={e => {
            if (!e.target.value) e.target.type = "text";
          }}
        />
        <p className="text-red text-xs mb-2">*미입력 알림 텍스트 부분</p>
      </div>

      <button className="h-12 bg-primary text-white font-bold text-xl w-full mb-4">
        로그아웃
      </button>
      <button className="h-12 bg-primary text-white font-bold text-xl w-full mb-4">
        회원탈퇴
      </button>
    </>
  );
}
