import InputField from "@components/layout/InputField";

export default function ReviewWrite() {
  return (
    <div>
      <InputField
        placeholder="나 대신 일하는 사람을 검색해보세요."
        isLast={true}
      />
      <div className="flex gap-4 mt-4 flex-wrap">
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          구인 중
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          구인 완료
        </div>
        <div className="ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl">
          대타 완료
        </div>
        <div className="ring-1 ring-primary px-4 py-2 rounded-xl">
          송금 완료
        </div>
      </div>
    </div>
  );
}
