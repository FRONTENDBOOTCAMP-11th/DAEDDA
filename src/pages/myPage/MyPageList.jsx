import PropTypes from "prop-types";

MyPageList.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  mb: PropTypes.number,
  size: PropTypes.number,
};

export default function MyPageList({ icon, label }) {
  return (
    <div className="flex mb-4 items-center">
      <img src={`/icons/${icon}.svg`} alt={label} className="mr-3" />
      <p className="text-xl">{label}</p>
      <img src="/icons/arrow.svg" alt="" className="ml-auto size-4 mb-2" />
    </div>
  );
}
