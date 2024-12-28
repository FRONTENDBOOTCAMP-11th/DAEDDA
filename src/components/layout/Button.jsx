import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.number,
  type: PropTypes.string,
};

export default function Button({
  children = "버튼",
  onClick,
  color = "purple",
  width = 92,
  height = "sm",
  type = "button",
}) {
  let combinedClassName = "";

  // 색
  switch (color) {
    case "purple": {
      combinedClassName += " bg-primary text-white font-bold  rounded";
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
      combinedClassName += "bg-gray-200 text-white font-bold rounded";
      break;
    }
    default:
      break;
  }

  // 높이
  switch (height) {
    case "xs": {
      combinedClassName += "h-6  text-[10px]";
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

  return (
    <button
      className={`${combinedClassName}`}
      onClick={onClick}
      style={{ width: `${width}px` }}
      type={type}
    >
      {children}
    </button>
  );
}
