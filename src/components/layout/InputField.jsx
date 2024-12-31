import PropTypes from "prop-types";

// 회원가입, 로그인 기준 input
InputField.propTypes = {
  labelName: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  errorMsg: PropTypes.string,
  isLast: PropTypes.bool,
  isTextArea: PropTypes.bool,
  register: PropTypes.func,
  name: PropTypes.string.isRequired,
};

export default function InputField({
  labelName = "",
  type = "text",
  placeholder = "",
  errorMsg = "",
  isLast = false,
  isTextArea = false,
  register,
  name,
  ...props
}) {
  // type에 따라 전달할 props 객체를 다르게 저장하는 변수
  const dateTypeProps =
    type === "date"
      ? {
          type: "text",
          placeholder: "연도-월-일",
          onFocus: e => (e.target.type = "date"),
          onBlur: e => {
            if (!e.target.value) e.target.type = "text";
          },
        }
      : { type, placeholder };

  return (
    <div>
      {labelName && <p className="text-base font-semibold mb-2">{labelName}</p>}

      {isTextArea ? (
        <textarea
          {...dateTypeProps}
          className={`w-full p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary ${errorMsg ? "mb-2" : isLast ? "" : "mb-[28px]"}`}
          rows={10}
          {...(register && register(name))}
          {...props}
        />
      ) : (
        <input
          {...dateTypeProps}
          className={`w-full h-[48px] p-3 border-2 border-#999 rounded-lg focus:outline-none focus:border-primary ${errorMsg ? "mb-2" : isLast ? "" : "mb-[28px]"}`}
          {...(register && register(name))}
          {...props}
        />
      )}
      {errorMsg && (
        <p
          className={`text-red text-xs ${isLast ? "" : "mb-2"}`}
        >{`*${errorMsg}`}</p>
      )}
    </div>
  );
}
