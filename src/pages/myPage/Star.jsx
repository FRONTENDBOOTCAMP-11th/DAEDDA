export default function Star({ reply, partTime }) {
  //   console.log("별 페이지 사장일때", reply);
  //   console.log("별페이지 알바생일때", partTime);
  if (reply) {
    const rating = reply.rating;
    if (isNaN(rating) || rating < 1) {
      return <div>별점이 없습니다.</div>;
    }
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <img key={i} src="/icons/reviews/star.svg" alt={`별 ${i + 1}개`} />,
      );
    }
    return <div className="flex gap-1 size-3 mb-2">{stars}</div>;
  } else {
    const parTimeRating = partTime.extra.rating;
    if (isNaN(parTimeRating) || parTimeRating < 1) {
      return <div>별점이 없습니다.</div>;
    }
    const partTimeStars = [];
    for (let i = 0; i < parTimeRating; i++) {
      partTimeStars.push(
        <img key={i} src="/icons/reviews/star.svg" alt={`별 ${i + 1}개`} />,
      );
    }
    return <div className="flex gap-1 size-3 mb-2">{partTimeStars}</div>;
  }
}
