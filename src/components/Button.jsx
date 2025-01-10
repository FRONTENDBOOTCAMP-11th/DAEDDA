import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  height: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default function Button({
  children = "버튼",
  onClick,
  color = "purple",
  height = "sm",
  type = "button",
  className = "w-full",
  disabled = false,
}) {
  let combinedClassName = "";

  // 색
  switch (color) {
    case "purple": {
      combinedClassName += " bg-primary text-white font-bold rounded";
      break;
    }
    case "white": {
      combinedClassName +=
        " bg-white text-primary font-bold  border border-primary rounded";
      break;
    }
    case "red": {
      combinedClassName += " bg-red text-white font-bold rounded";
      break;
    }
    case "gray": {
      combinedClassName += " bg-gray-200 text-white font-bold rounded";
      break;
    }
    case "yellow": {
      combinedClassName += " bg-yellow-100 text-white font-bold rounded";
      break;
    }
    default:
      break;
  }

  // 높이
  switch (height) {
    case "xs": {
      combinedClassName += " h-6  text-[10px]";
      break;
    }
    case "sm": {
      combinedClassName += " h-8 text-[14px]";
      break;
    }
    case "md": {
      combinedClassName += " h-9 text-[20px]";
      break;
    }
    case "lg": {
      combinedClassName += " h-12 text-[20px]";
      break;
    }
    default:
      break;
  }

  console.log(disabled);

  return (
    <button
      className={`${combinedClassName} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
