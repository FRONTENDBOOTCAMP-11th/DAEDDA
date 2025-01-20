import Button from "@components/Button";
import { useNavigate } from "react-router-dom";

export default function Refund() {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className=" flex flex-col justify-center break-keep whitespace-normal px-6 -mt-[70px] -mx-6 max-w-screen-sm m-auto h-screen overflow-hidden">
      <div className="mb-5  border-b pb-5">
        <h1 className="text-3xl mb-3">대따몬 일당 환불 규정</h1>
        <p>
          대따몬은 일당을 선 결제로 운영하며, 구인자와 근로자의 원활한 매칭을
          위해 아래와 같은 환불 규정을 적용합니다. <br />이 규정을 통해 구인자와
          근로자가 모두 공정한 환경에서 매칭될 수 있도록 운영됩니다. 😊
        </p>
      </div>

      <div>
        <h3 className="mb-2"> ✅ 환불 규정</h3>
        <div className="mb-3">
          <h4 className="px-3 font-bold">📌 100% 환불</h4>
          <ul className="px-8">
            <li>- 원할한 취소가 가능하며, 전액 환불됩니다.</li>
          </ul>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="mb-2"> ✅ 유의사항</h3>
        <ul className="px-3">
          <li className="pb-1">📌 취소 시 구인글은 재등록되지 않습니다.</li>
          <li className="pb-1">
            📌 채택 된 지원자가 있는 상태에서 근무 날짜가 지나면 삭제가
            불가능합니다.
          </li>
          <li>
            📌 환불 규정은 근무 매칭의 신뢰성을 보장하고,
            <p className="pl-7">
              모든 참여자의 권리를 보호하기 위해 마련되었습니다.
            </p>
          </li>
        </ul>
      </div>
      <Button color="white" height="sm" onClick={goBack}>
        확인했습니다
      </Button>
    </div>
  );
}
