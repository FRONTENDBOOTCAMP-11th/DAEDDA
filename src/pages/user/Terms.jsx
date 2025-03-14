import Button from "@components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Terms() {
  // 초기 상태 - 전체, 개별, errorMsg
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecked, setIndividualChecked] = useState([false, false]);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  // 전체 동의시 모두 체크
  const handleAllCheck = e => {
    const isChecked = e.target.checked;
    setAllChecked(isChecked);
    setIndividualChecked([isChecked, isChecked]);
  };

  const handleIndividual = index => e => {
    const isChecked = e.target.checked;

    // 불변성을 위해 새로운 배열로 복사 후 처리
    const newIndividual = [...individualChecked];

    // 체크 확인 후 상태 변경
    newIndividual[index] = isChecked;
    setIndividualChecked(newIndividual);

    if (newIndividual[0] && newIndividual[1]) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    // 전체 체크가 되었으면 이동, 아니라면 errorMsg 출력
    if (allChecked) {
      // console.log("ok");
      navigate("/user/signUp");
    } else {
      setShowError(true);
    }
  };

  const handleCancel = () => {
    navigate("/user/signIn");
  };

  return (
    <div className="flex flex-col mb-[40px]">
      <div className="flex justify-center w-full">
        <img src="/logos/logo.png" className="max-w-full h-[70px] mb-6" />
      </div>
      <h1 className="text-[2rem] mb-6">환영합니다!</h1>
      <p className="font-light text-[0.75rem] mb-6">
        약관에 동의 하셔야 회원 가입이 가능합니다.
      </p>

      <form onSubmit={handleSubmit}>
        <p className="text-[1rem] font-bold">약관 동의</p>
        <div className="flex gap-6 items-center py-5 border-b-2">
          <input
            type="checkbox"
            className="accent-primary border-primary w-5 h-5"
            id="check-all"
            checked={allChecked}
            onChange={handleAllCheck}
          ></input>
          <label htmlFor="check-all" className="font-semibold text-[1rem]">
            전체 동의
          </label>
        </div>
        <div className="flex items-center gap-6 py-5">
          <input
            type="checkbox"
            className="accent-primary border-primary w-5 h-5"
            checked={individualChecked[0]}
            onChange={handleIndividual(0)}
            id="check-1"
          ></input>
          <label htmlFor="check-1" className="text-[1rem]">
            <strong>(필수)</strong> 서비스 이용 약관 동의
          </label>
        </div>
        <div className="flex items-center gap-6 py-5">
          <input
            type="checkbox"
            className="accent-primary border-primary w-5 h-5"
            checked={individualChecked[1]}
            onChange={handleIndividual(1)}
            id="check-2"
          ></input>
          <label htmlFor="check-2" className="text-base">
            <strong>(필수)</strong> 개인 정보 수집 및 이용 동의
          </label>
        </div>

        <div className={`${showError ? "visible" : "invisible"}`}>
          <p className={`my-5 text-red`}>* 약관에 모두 동의해야 합니다.</p>
        </div>
        <Button
          color="gray"
          height="lg"
          className={`mb-2 w-full font-bold rounded text-white ${!allChecked ? "bg-gray-200 cursor-not-allowed" : "bg-primary cursor-pointer"}`}
          type="submit"
        >
          계속
        </Button>
        <Button color="white" height="lg" onClick={handleCancel}>
          취소
        </Button>
      </form>
    </div>
  );
}
