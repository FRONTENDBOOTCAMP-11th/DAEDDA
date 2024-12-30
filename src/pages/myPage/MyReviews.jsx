import Button from "@components/layout/Button";

export default function MyReviews() {
  return (
    <div>
      <p className="font-bold text-[18px] pb-8 px-5">후기 2개</p>

      <div className="shadow-custom-shadow rounded-3xl px-5 pt-4 pb-8 mb-7">
        <div className="flex gap-1">
          <div>
            <div className="flex gap-5">
              <img
                src="/src/assets/images/smiling_daeddamon.png"
                alt=""
                className="size-10"
              />
              <div className="max-w-[440px]">
                <p className="font-bold">리뷰 쓴 사람</p>
                <div className="flex gap-1 size-3 mb-2">
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/blankStar.svg" />
                </div>
                <p className="break-keep whitespace-normal text-sm">
                  이번에 대타로 와주신 김지원 님에 대한 리뷰를 남깁니다.
                  지원님은 연락이 정말 빠르고 정확하게 이루어졌습니다. 처음 대타
                  요청에 응답해 주실 때부터 친절하게 자신의 경력과 가능 여부를
                  상세히 설명해 주셔서 신뢰가 갔습니다. 정리하자면, 지원 님은
                  성실함, 책임감, 그리고 친절함까지 모두 갖춘 알바생이었습니다.
                  다시 한 번 감사드리며, 다음에도 기회가 된다면 꼭 함께 일하고
                  싶습니다! 😊
                </p>
              </div>
            </div>
          </div>
          <Button height="xs" color="white" className="w-[47px]">
            신고하기
          </Button>
        </div>
      </div>

      <div className="shadow-custom-shadow rounded-3xl px-5 pt-4 pb-8 mb-7">
        <div className="flex gap-1">
          <div>
            <div className="flex gap-5">
              <img
                src="/src/assets/images/smiling_daeddamon.png"
                alt=""
                className="size-10"
              />
              <div className="max-w-[440px]">
                <p className="font-bold">리뷰 쓴 사람</p>
                <div className="flex gap-1 size-3 mb-2">
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/blankStar.svg" />
                </div>
                <p className="break-keep whitespace-normal text-sm">
                  이번에 대타로 와주신 김지원 님에 대한 리뷰를 남깁니다.
                  지원님은 연락이 정말 빠르고 정확하게 이루어졌습니다. 처음 대타
                  요청에 응답해 주실 때부터 친절하게 자신의 경력과 가능 여부를
                  상세히 설명해 주셔서 신뢰가 갔습니다. 정리하자면, 지원 님은
                  성실함, 책임감, 그리고 친절함까지 모두 갖춘 알바생이었습니다.
                  다시 한 번 감사드리며, 다음에도 기회가 된다면 꼭 함께 일하고
                  싶습니다! 😊
                </p>
              </div>
            </div>
          </div>
          <Button height="xs" color="white" className="w-[47px]">
            신고하기
          </Button>
        </div>
      </div>

      <div className="shadow-custom-shadow rounded-3xl px-5 pt-4 pb-8 mb-7">
        <div className="flex gap-1">
          <div>
            <div className="flex gap-5">
              <img
                src="/src/assets/images/smiling_daeddamon.png"
                alt=""
                className="size-10"
              />
              <div className="max-w-[440px]">
                <p className="font-bold">리뷰 쓴 사람</p>
                <div className="flex gap-1 size-3 mb-2">
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/star.svg" />
                  <img src="/icons/reviews/blankStar.svg" />
                </div>
                <p className="break-keep whitespace-normal text-sm">
                  이번에 대타로 와주신 김지원 님에 대한 리뷰를 남깁니다.
                  지원님은 연락이 정말 빠르고 정확하게 이루어졌습니다. 처음 대타
                  요청에 응답해 주실 때부터 친절하게 자신의 경력과 가능 여부를
                  상세히 설명해 주셔서 신뢰가 갔습니다. 정리하자면, 지원 님은
                  성실함, 책임감, 그리고 친절함까지 모두 갖춘 알바생이었습니다.
                  다시 한 번 감사드리며, 다음에도 기회가 된다면 꼭 함께 일하고
                  싶습니다! 😊
                </p>
              </div>
            </div>
          </div>
          <Button height="xs" color="white" className="w-[47px]">
            신고하기
          </Button>
        </div>
      </div>
    </div>
  );
}
