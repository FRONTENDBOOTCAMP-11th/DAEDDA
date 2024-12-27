import PropTypes from "prop-types";

MyPageList.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  pb: PropTypes.number,
  mb: PropTypes.number,
  size: PropTypes.number,
};

export default function MyPageList({ icon, label, pb = 0, mb = "0", size }) {
  return (
    <div className="flex mb-4 items-center">
      <img
        src={`/icons/${icon}.svg`}
        alt={label}
        className={`${size ? `size-${size}` : ""} mr-3 ${mb ? `mb-${mb}` : ""}`}
      />
      <p className={`text-xl ${pb ? `pb-${pb}` : ""}`}>{label}</p>
    </div>
  );
}
