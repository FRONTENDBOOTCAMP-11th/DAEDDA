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
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        // className={`w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary ${className}`}
        className={`w-full h-12 rounded-lg ring-2 ring-[#999] focus:outline-none focus:ring-primary p-3${className}`}
      />
    </>
  );
}
