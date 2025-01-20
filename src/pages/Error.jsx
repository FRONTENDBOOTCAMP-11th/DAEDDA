import Button from "@components/Button";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();
  const goMain = () => {
    navigate(`/`);
  };

  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className=" -mt-[70px] -mx-6 max-w-screen-sm m-auto h-screen overflow-hidden   flex items-center  flex-col bg-[#F8F1FF] px-5">
      <img src="/images/404_daeddamon.png" alt="" className="mt-20 mb-8" />
      <p className="font-bold text-3xl  text-center mb-8">
        죄송합니다. <br />
        아직 준비중인 기능입니다.
      </p>
      <p className="text-xl max-w-[480px] text-center mb-8">
        더 나은 경험을 제공하기 위해 <br />
        노력하고 있습니다. <br />
        지금은 이용할 수 없지만, 다른 멋진 페이지를 둘러보세요! 😊
      </p>
      <div className="flex gap-11">
        <Button
          className="w-[160px]"
          height="lg"
          color="white"
          onClick={goMain}
        >
          메인으로
        </Button>
        <Button
          className="w-[160px]"
          height="lg"
          onClick={goBack}
          color="purple"
        >
          이전으로
        </Button>
      </div>
    </div>
  );
}
