import Button from "@components/Button";
import { useGetOrderState } from "@hooks/useGetOrderState";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "@/utills/func.js";

WorkedItem.propTypes = {
  data: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default function WorkedItem({ data }) {
  const navigate = useNavigate();
  const { data: state } = useGetOrderState(data.state);
  const onReviewWriteClicked = () => {
    navigate("reviewWrite", {
      state: { order: data },
    });
  };

  return (
    <>
      {data && (
        <div className="p-4 rounded-3xl shadow-custom-shadow mb-5 relative">
          <div>
            <Link
              to={`/post/${data.products[0]._id}`}
              className="flex  w-full justify-between mb-3"
              state={"employed"}
            >
              <h4 className="flex items-center text-mb font-bold text-purple-900">
                {state?.value}
              </h4>
              <Button color="white" height="sm" className="w-[80px]">
                상세 내역
              </Button>
            </Link>
          </div>
          <div className="mb-6">
            <p className="font-semibold text-[1.125rem]">
              {data.products[0].name}
            </p>
            <p>{data.products[0].price.toLocaleString()}원</p>
            <p>
              {formatDate(data.products[0].extra.condition.date)}ㆍ
              {data.products[0].extra.condition.workTime[0]} ~{" "}
              {data.products[0].extra.condition.workTime[1]}
            </p>
          </div>

          <Button
            disabled={state.value === "입금 완료" ? false : true}
            color={state.value === "입금 완료" ? "purple" : "gray"}
            height="md"
            onClick={() => {
              onReviewWriteClicked();
            }}
          >
            리뷰 작성하기
          </Button>
        </div>
      )}
    </>
  );
}
