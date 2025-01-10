import Button from "@components/Button";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "@/utills/func.js";
import { useMutation } from "@tanstack/react-query";
import useAxiosInstance from "@hooks/useAxiosInstance";

EmployedItem.propTypes = {
  data: PropTypes.object.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default function EmployedItem({ data, refetch }) {
  const navigate = useNavigate();
  // 구인 완료 버튼 클릭 시

  const onCompleteClicked = (company, price) => {
    const isOkay = confirm(
      `${company}에서 시킨 일이 완료 처리되었습니다. 결제하신 ${price}원이 일해주신 분에게 전달됩니다.`,
    );
    // 구인글 상태 대타 완료로 변경
    if (isOkay) {
      editProductState.mutate({ productId: data._id, state: "송금 완료" });
      navigate(`reviewWrite/${data._id}`);
    }
  };

  const onReviewWriteClicked = () => {
    navigate(`reviewWrite/${data._id}`);
  };

  const axios = useAxiosInstance();

  const editProductState = useMutation({
    mutationFn: async ({ productId, state }) => {
      return axios.patch(`/seller/products/${productId}`, {
        "extra.state": state,
      });
    },

    onSuccess: () => {
      refetch();
    },
    onError: error => {
      console.error("등록 실패:", error);
    },
  });

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
            <h4 className="text-sm font-bold">{data.extra.state}</h4>
            <p>{data.extra.condition.company}</p>
            <p>{data.price.toLocaleString()}원</p>
            <p>
              {formatDate(data.extra.condition.date)}ㆍ
              {data.extra.condition.workTime[0]} ~{" "}
              {data.extra.condition.workTime[1]}
            </p>
          </div>

          <Button
            disabled={
              data.extra.state === "구인 완료" ||
              data.extra.state === "송금 완료"
                ? false
                : true
            }
            color={
              data.extra.state === "구인 완료" ||
              data.extra.state === "송금 완료"
                ? "purple"
                : "gray"
            }
            height="md"
            onClick={
              data.extra.state === "구인 완료"
                ? () =>
                    onCompleteClicked(data.extra.condition.company, data.price)
                : data.extra.state === "송금 완료"
                  ? () => onReviewWriteClicked()
                  : null
            }
          >
            {data.extra.state === "구인 완료" ? "송금하기" : "리뷰 작성하기"}
          </Button>
        </div>
      )}
    </>
  );
}
