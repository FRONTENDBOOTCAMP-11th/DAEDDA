import PropTypes from "prop-types";

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string,
  className: PropTypes.string,
};

export default function Button({ children, onClick, color, width, height }) {
  let combinedClassName = "";

  // 색
  switch (color) {
    case "purple": {
      combinedClassName +=
        " bg-primary text-white font-bold w-full mb-4 rounded";
      break;
    }
    case "white": {
      combinedClassName +=
        " bg-white text-primary font-bold w-full mb-4 border border-primary rounded";
      break;
    }
    case "red": {
      combinedClassName += " bg-red text-white font-bold mb-4 rounded";
      break;
    }
    default:
      break;
  }

  // 높이
  switch (height) {
    case "sm": {
      combinedClassName += " h-8";
      break;
    }
    case "md": {
      combinedClassName += " h-9";
      break;
    }
    case "lg": {
      combinedClassName += " h-12";
      break;
    }
    default:
      break;
  }

  // 넓이이
  switch (width) {
    case "xl": {
      combinedClassName += " w-16 text-[14px]";
      break;
    }
    case "2xl": {
      combinedClassName += " w-[92px] text-[14px]";
      break;
    }
    default:
      break;
  }

  return (
    <button className={`${combinedClassName}`} onClick={onClick}>
      {children}
    </button>
  );
}
