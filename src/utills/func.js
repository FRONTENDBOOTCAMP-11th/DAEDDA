// 시작 시간, 마치는 시간 string을 받아
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
  let date = new Date(dateString);

  let month = date.getMonth() + 1;
  let day = date.getDate();

  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  let weekday = weekdays[date.getDay()];

  return `${month}/${day} ${weekday}`;
};

export { getWorkTime, getTimePassed, formatDate };
