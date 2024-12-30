import PropTypes from "prop-types";

MyPageList.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mb: PropTypes.number,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default function MyPageList({ icon, label, className = "" }) {
  return (
    <div className="flex mb-4 items-center ">
      <img
        src={`/icons/${icon}.svg`}
        alt={label}
        className={`mr-3 size-5 ${className}`}
      />
      <p className="text-xl">{label}</p>
      <img src="/icons/arrow.svg" alt="" className="ml-auto size-4 mb-1" />
    </div>
  );
}
