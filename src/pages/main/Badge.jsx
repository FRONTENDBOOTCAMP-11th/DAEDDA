import PropTypes from "prop-types";

Badge.propTypes = {
  number: PropTypes.number.isRequired,
};

export default function Badge({ number }) {
  return (
    <div className="flex gap-[2px] items-center bg-purple-50 px-1 rounded-lg">
      <p className="font-semibold text-[14px] text-primary">{number}%</p>
      <img src="/icons/charge.svg" />
    </div>
  );
}
