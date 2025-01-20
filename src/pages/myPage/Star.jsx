import PropTypes from "prop-types";

Star.propTypes = {
  reply: PropTypes.object,
  partTime: PropTypes.object,
};

export default function Star({ reply, partTime }) {
  // console.log("별 페이지 사장일때", reply);
  // console.log("별페이지 알바생일때", partTime);
  if (reply) {
    const rating = reply.rating || 0;
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
    const parTimeRating =
      partTime.extra?.contents.map(item => item.rating) || 0;
    // console.log(parTimeRating); //[5, 5, 5, 5]
    if (
      parTimeRating.length === 0 ||
      parTimeRating.some(rating => isNaN(rating) || rating < 1)
    ) {
      return <div>별점이 없습니다.</div>;
    }
    return (
      <>
        {parTimeRating.map((rating, i) => (
          <img
            className="size-5"
            key={i}
            src="/icons/reviews/star.svg"
            alt={`별 ${i + 1}개`}
          />
        ))}
      </>
    );
  }
}
