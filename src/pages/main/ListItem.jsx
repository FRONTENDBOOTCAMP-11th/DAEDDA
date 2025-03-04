import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate, getTimePassed, getWorkTime } from "@/utills/func.js";
import { forwardRef } from "react";

const ListItem = forwardRef(({ data }, ref) => {
  const hasExpired = new Date(data.extra.condition.date) < new Date();

  return (
    <Link
      to={`/post/${data._id}`}
      className="flex justify-between shadow-custom-shadow rounded-3xl px-4 py-4 items-center relative"
      ref={ref}
    >
      {hasExpired && (
        <div className=" bg-gray-200 absolute opacity-90 inset-0 rounded-3xl flex items-center justify-center text-2xl font-bold text-black text-opacity-60 pointer-events-none">
          마감된 공고입니다.
        </div>
      )}
      <div className="flex flex-col gap-1 screen-530:gap-[2px] ">
        <h3 className="font-bold text-[1.25rem] screen-530:text-[1rem] break-keep">
          {data.name}
        </h3>
        <p className="font-semibold text-gray-500 text-[1rem] screen-530:text-[0.875rem]">
          {data.extra.condition.company} ㆍ {getTimePassed(data.createdAt)}
        </p>
        <h3 className="text-[1.25rem] font-bold text-purple-900 screen-530:text-[1rem]">
          {`${data.price.toLocaleString()}원ㆍ시급 ${Math.round(
            data.price /
              getWorkTime(
                data.extra.condition.workTime[0],
                data.extra.condition.workTime[1],
              ),
          ).toLocaleString()}원`}
        </h3>
        <p className="font-semibold text-[0.875rem] screen-530:text-[0.75rem]">
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
      <div className="flex-shrink-0 ">
        <img
          className="size-[136px] object-cover screen-530:size-[100px] rounded-xl ml-2"
          src={
            data.mainImages
              ? `https://11.fesp.shop/files/final01/${data.mainImages[0].name}`
              : "https://placehold.co/400"
          }
        />
      </div>
    </Link>
  );
});

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
};

ListItem.displayName = "ListItem"; // eslint 오류 해결

export default ListItem;
