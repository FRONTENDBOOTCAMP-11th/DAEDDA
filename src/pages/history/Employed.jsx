import InputField from "@components/InputField";
import { useMyProductsFilter } from "@hooks/useGetMyProducts";
import EmployedItem from "@pages/history/EmployedItem";
import HistorySearch from "@pages/history/historySarch";
import State from "@pages/history/State";
import useUserStore from "@zustand/userStore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const codes = ["EM010", "EM020", "EM030", "EM040"];

export default function Employed() {
  const { user } = useUserStore();

  const [keyword, setKeyword] = useState("");
  const { register, handleSubmit } = useForm();

  const [toggledStates, setToggledStates] = useState([]);
  const { data, refetch } = useMyProductsFilter(
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
      {data && (
        <>
          <EmployedItem productId={data[0]?._id} refetch={refetch} />
          <EmployedItem productId={data[1]?._id} refetch={refetch} />
          <EmployedItem productId={data[2]?._id} refetch={refetch} />
          <EmployedItem productId={data[3]?._id} refetch={refetch} />
          <EmployedItem productId={data[4]?._id} refetch={refetch} />
          <EmployedItem productId={data[5]?._id} refetch={refetch} />
        </>
      )}
    </div>
  );
}
