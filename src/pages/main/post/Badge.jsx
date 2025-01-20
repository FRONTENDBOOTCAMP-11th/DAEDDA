import { useProfileData } from "@hooks/useProfileData";
import PropTypes from "prop-types";
import { getDydamicWidth } from "@/utills/calculateStarPower";

Badge.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default function Badge({ userId }) {
  const { reviews, partTime } = useProfileData(userId);
  const dydamicWidth = getDydamicWidth(reviews, partTime);

  return (
    <div className="flex gap-[2px] items-center bg-purple-50 px-1 rounded-lg">
      <p className="font-semibold text-[14px] text-primary">{dydamicWidth}%</p>
      <img src="/icons/charge.svg" />
    </div>
  );
}
