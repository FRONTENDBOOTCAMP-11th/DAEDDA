import PropTypes from "prop-types";
import { Link } from "react-router-dom";

ListItem.propTypes = {
  data: PropTypes.object.isRequired,
};

// 시작 시간, 마치는 시간을 string을 받아
// 일한 시간 number을 반환하는 함수
const getWorkTime = (start, end) => {
  const startTime = +start.replace(":", "");
  const endTime = +end.replace(":", "");

  const timeGap = endTime - startTime;
  return Math.round(timeGap / 100);
};

// 생성 시간 string을 받아
// 현재 시간으로부터 지난 시간에 대해 알맞은 string을 리턴하는 함수
const getTimePassed = createdAt => {
  const formattedDate = createdAt.replaceAll(".", "-");
  const diff = new Date() - new Date(formattedDate);

  const sec = diff / 1000;
  const min = sec / 60;
  const hours = min / 60;
  const days = hours / 24;

  if (min < 0) {
    return "방금 전";
  } else if (min < 60) {
    return `${Math.round(min)}분 전`;
  } else if (hours < 24) {
    return `${Math.round(hours)}시간 전`;
  } else if (days < 2) {
    return "하루 전";
  } else {
    return "며칠 전";
  }
};

// date string을 받아
// 월/일 요일 형태의 string으로 변환해주는 함수
const formatDate = dateString => {
  console.log(dateString);
  let date = new Date(dateString);

  let month = date.getMonth() + 1;
  let day = date.getDate();
  console.log(month, day);

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  let weekday = weekdays[date.getDay()];

  return `${month}/${day} ${weekday}`;
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
          className="size-[136px]"
          src={`https://11.fesp.shop/files/final01/${data.mainImages[0].name}`}
        />
      </div>
    </Link>
  );
}
