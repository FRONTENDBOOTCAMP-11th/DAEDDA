import PropTypes from "prop-types";

Star.propTypes = {
  reply: PropTypes.object,
  partTime: PropTypes.object,
};

export default function Star({ reply, rating }) {
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
    let stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <img
          key={i}
          src="/icons/reviews/star.svg"
          alt={`별 ${i + 1}개`}
          className="size-4"
        />,
      );
    }
    return <div className="flex gap-1 size-3 mb-2">{stars}</div>;
  }
}
