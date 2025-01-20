const starPower = {
  1: -2,
  2: -1,
  3: 1,
  4: 2,
  5: 3,
};

export function calculateTotalPower(data) {
  let totalPower = 0;
  data.forEach(item => {
    item.replies?.forEach(reply => {
      const star = parseInt(reply.rating);
      totalPower += starPower[star] || 0;
    });
  });
  // console.log("사장 최종 알바력", totalPower);
  return totalPower;
}

export function calculatePartTimePower(data) {
  let partTimetotalPower = 0;
  data.byUser?.forEach(reply => {
    if (reply.extra?.contents) {
      reply.extra?.contents.forEach(item => {
        const partTimeStar = item.rating || 0;
        partTimetotalPower += starPower[partTimeStar] || 0;
      });
      // console.log("최종리뷰", partTimetotalPower);
    }
    // const partTimeStar = reply.extra?.contents.map(item => item.rating) || 0;
    // partTimetotalPower += starPower[partTimeStar] || 0;
  });
  return partTimetotalPower;
}
export function getDydamicWidth(reviews = [], partTime = {}) {
  const totalPower = calculateTotalPower(reviews);
  const partTimePower = calculatePartTimePower(partTime);
  const totalReview = Math.round(((totalPower + partTimePower) / 2) * 10) / 10;
  return totalReview + 50; // 최종 대타력 값 반환
}
