import Button from "@components/layout/Button";

export default function Error() {
  return (
    <div className="-mx-6 max-w-screen-sm m-auto h-screen overflow-y-auto relative  flex items-center flex-col bg-[#F3E5FF]">
      <img src="/images/404_daeddamon.png" alt="" className="mt-20 mb-8" />
      <p className="font-bold text-3xl mb-12">
        죄송합니다. 아직 준비중인 기능입니다
      </p>
      <p className="text-xl max-w-[505px] text-center mb-8">
        더 나은 경험을 제공하기 위해 노력하고 있습니다. 지금은 이용할 수 없지만,
        다른 멋진 페이지를 둘러보세요! 😊
      </p>
      <div className="flex gap-11">
        <Button className="w-[160px]" height="lg" color="white">
          메인으로
        </Button>
        <Button className="w-[160px]" height="lg">
          지원하기
        </Button>
      </div>
    </div>
  );
}
