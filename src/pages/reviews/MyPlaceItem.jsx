import Button from "@components/layout/Button";
import { useGetOrderState } from "@hooks/useGetOrderState";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate } from "@/utills/func.js";

MyPlaceItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default function MyPlaceItem({ data }) {
  const state = useGetOrderState(data.state);
  return (
    <>
      {data && (
        <div className="p-4 rounded-3xl shadow-custom-shadow mb-5 relative">
          <Link
            to={`/main/${data.products[0]._id}`}
            className="w-[83px] absolute top-4 right-4"
          >
            <Button color="white" width="xl" height="sm">
              상세 내역
            </Button>
          </Link>
          <div className="mb-6">
            <h4 className="text-sm font-bold">{state}</h4>
            <p>{data.products[0].extra.condition.company}</p>
            <p>{data.products[0].price.toLocaleString()}원</p>
            <p>
              {formatDate(data.products[0].extra.condition.date)}ㆍ
              {data.products[0].extra.condition.workTime[0]} ~{" "}
              {data.products[0].extra.condition.workTime[1]}
            </p>
          </div>
          <Link
            className={state === "입금 완료" ? "" : "pointer-events-none"}
            to={`/review/${data._id}/write`}
            state={"worked"}
          >
            <Button
              color={state === "입금 완료" ? "purple" : "gray"}
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
