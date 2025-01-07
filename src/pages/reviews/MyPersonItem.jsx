import Button from "@components/layout/Button";
import { formatDate } from "@/utills/func.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

MyPersonItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function MyPersonItem({ data }) {
  return (
    <>
      {data && (
        <div className="p-4 rounded-3xl shadow-custom-shadow mb-5 relative">
          <Link
            to={`/main/${data._id}`}
            className="w-[83px] absolute top-4 right-4"
          >
            <Button color="white" width="xl" height="sm">
              상세 내역
            </Button>
          </Link>
          <div className="mb-6">
            <h4 className="text-sm font-bold">{data.extra.status}</h4>
            <p>{data.extra.condition.company}</p>
            <p>{data.price.toLocaleString()}원</p>
            <p>
              {formatDate(data.extra.condition.date)}ㆍ
              {data.extra.condition.workTime[0]} ~{" "}
              {data.extra.condition.workTime[1]}
            </p>
          </div>
          <Link
            className={
              data.extra.status === "대타 완료" ? "" : "pointer-events-none"
            }
            to={`/review/${data._id}/write`}
            state={"hired"}
          >
            <Button
              color={data.extra.status === "대타 완료" ? "purple" : "gray"}
              height="md"
            >
              리뷰 작성하기
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}