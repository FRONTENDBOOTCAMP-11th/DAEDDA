import PropTypes from "prop-types";

// 회원가입, 로그인 기준 input
InputField.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};

export default function InputField({
  type = "text",
  placeholder = "",
  className = "",
}) {
  // date type input에 placeholder 색을 입히기 위함
  if (type === "date")
    return (
      <>
        <input
          type="text"
          placeholder="연도-월-일"
          className={`w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary ${className} placeholder-gray-400`}
          onFocus={e => (e.target.type = "date")}
          onBlur={e => {
            if (!e.target.value) e.target.type = "text";
          }}
        />
      </>
    );
  else {
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
}
