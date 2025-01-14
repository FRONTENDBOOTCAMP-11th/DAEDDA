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
  return totalPower;
}

export function calculatePartTimePower(data) {
  let partTimetotalPower = 0;
  data.byUser?.forEach(reply => {
    const partTimeStar = reply.extra?.rating || 0;
    partTimetotalPower += starPower[partTimeStar] || 0;
  });
  return partTimetotalPower;
}
