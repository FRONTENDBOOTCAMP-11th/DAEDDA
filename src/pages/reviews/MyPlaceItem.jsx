import Button from "@components/layout/Button";
import { useGetOrderState } from "@hooks/useGetOrderState";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate } from "@/utills/func.js";

MyPlaceItem.propTypes = {
  data: PropTypes.object.isRequired,
};

// data.extra.position에 따라 worker, employer 구분

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
          {/* 리뷰 작성 버튼 활성화 로직 */}
          <Link
            className={
              data.extra.position === "worker"
                ? state === "입금 완료"
                  ? ""
                  : "pointer-events-none"
                : state === "대타 완료"
                  ? ""
                  : "pointer-events-none"
            }
            to={`/review/${data.products[0]._id}/write`}
            state={{ position: data.extra.position, order: data }}
          >
            <Button
              color={
                data.extra.position === "worker"
                  ? state === "입금 완료"
                    ? "purple"
                    : "gray"
                  : state === "대타 완료"
                    ? "purple"
                    : "gray"
              }
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
