// 회원가입, 로그인 기준 input
export default function InputField({
  type = "text",
  placeholder = "",
  className = "",
}) {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary ${className}`}
      />
    </>
  );
}
