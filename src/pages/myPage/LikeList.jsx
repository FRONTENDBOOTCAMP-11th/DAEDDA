import { getWorkTime } from "@/utills/func";
import { getTimePassed } from "@/utills/func";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

LikeList.propTypes = {
  item: PropTypes.object.isRequired,
};
export default function LikeList({ item }) {
  console.log(item);
  console.log(item.product.extra?.condition?.name);
  return (
    <>
      <div className="likes-container">
        <div className="flex items-center ">
          <p className="text-sm mt-1">
            {item.product.extra?.condition?.company || "못된고양이"}
          </p>
          <img src="/icons/likes.svg" alt="찜하기 버튼" className="ml-auto" />
        </div>
        <p className="text-lg font-bold">{item.product.name}</p>
        <div className="flex gap-[6px] items-center">
          <img src="/icons/mapPin.svg" alt="위치 표시" className="size-3" />
          <p className="text-xs">민락동</p>
        </div>
        <div className="flex items-center">
          <div className="font-semibold">
            <div className="flex gap-2">
              <p className="text-secondary">시급</p>
              <p>
                {Math.round(
                  item.product.price /
                    getWorkTime(
                      item.product.extra?.condition?.workTime[0] || "09:00",
                      item.product.extra?.condition?.workTime[1] || "17:00",
                    ),
                ).toLocaleString()}
                원
              </p>
            </div>
            <p className="text-beige-500 text-xs pb-3">
              {getTimePassed(item.createdAt)}
            </p>
          </div>
          <button className="rounded-2xl border border-primary ml-auto">
            <Link to={`/main/${item.product._id}`}>
              <div className="flex gap-1 px-2 items-center">
                <img src="/icons/apply.svg" alt="지원 버튼" className="mb-1" />
                <p className="text-primary text-sm">지원</p>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
