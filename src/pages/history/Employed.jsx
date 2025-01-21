import InputField from "@components/InputField";
import { useMyProductsFilter } from "@hooks/useGetMyProducts";
import EmployedItem from "@pages/history/EmployedItem";
import HistorySearch from "@pages/history/HistorySearch";
import State from "@pages/history/State";
import useUserStore from "@zustand/userStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PulseLoader } from "react-spinners";

const codes = ["EM010", "EM020", "EM030", "EM040"];

export default function Employed() {
  const { user } = useUserStore();

  const [keyword, setKeyword] = useState("");
  const { register, handleSubmit } = useForm();

  const [toggledStates, setToggledStates] = useState([]);
  const { data, refetch, isLoading } = useMyProductsFilter(
    user?._id,
    toggledStates,
    keyword,
  );

  const onSearchSubmit = formData => {
    setKeyword(formData.keyword);
  };

  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    <div>
      <HistorySearch
        placeholder="나 대신 일하는 사람을 검색해보세요."
        handleSubmit={handleSubmit}
        register={register}
        onSearchSubmit={onSearchSubmit}
      />
      <div className="flex gap-4 mt-4 flex-wrap mb-5">
        {codes.map((code, index) => (
          <State
            key={index}
            code={code}
            toggledStates={toggledStates}
            setToggledStates={setToggledStates}
          />
        ))}
      </div>
      {isLoading && (
        <div className="flex justify-center items-center mt-32">
          <PulseLoader color={"#8C6FEE"} />
        </div>
      )}
      {data && data.length === 0 && (
        <div className="mt-[80px] flex items-center justify-center text-center text-xl text-gray-300">
          아직 내가 시킨킨 일이 없어요.
        </div>
      )}
      {data &&
        data.length !== 0 &&
        data.map(data => {
          return (
            <EmployedItem key={data._id} product={data} refetch={refetch} />
          );
        })}
    </div>
  );
}
