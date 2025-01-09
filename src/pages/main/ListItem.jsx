import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate, getTimePassed, getWorkTime } from "@/utills/func.js";

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function ListItem({ data }) {
  return (
    <Link
      to={`main/${data._id}`}
      className="flex justify-between shadow-custom-shadow rounded-3xl px-4 py-[22px] items-center"
    >
      <div className="flex flex-col gap-1">
        <h3 className="font-bold text-[20px]">{data.name}</h3>
        <p className="font-semibold text-gray-500">
          {data.extra.condition.company} ㆍ {getTimePassed(data.createdAt)}
        </p>
        <h3 className="text-[20px] font-bold text-purple-900">
          {`${data.price.toLocaleString()}원ㆍ시급 ${Math.round(
            data.price /
              getWorkTime(
                data.extra.condition.workTime[0],
                data.extra.condition.workTime[1],
              ),
          ).toLocaleString()}원`}
        </h3>
        <p className="font-semibold">
          {formatDate(data.extra.condition.date)}ㆍ
          {data.extra.condition.workTime[0]} ~{" "}
          {data.extra.condition.workTime[1]}ㆍ
          {getWorkTime(
            data.extra.condition.workTime[0],
            data.extra.condition.workTime[1],
          )}
          시간
        </p>
      </div>
      <div className="flex-shrink-0 screen-530:hidden">
        <img
          className="size-[136px] object-cover"
          src={
            data.mainImages
              ? `https://11.fesp.shop/files/final01/${data.mainImages[0].name}`
              : "https://placehold.co/400"
          }
        />
      </div>
    </Link>
  );
}
