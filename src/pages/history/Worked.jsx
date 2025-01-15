import { useOrdersFilter } from "@hooks/useGetOrders";
import HistorySearch from "@pages/history/HistorySearch";
import State from "@pages/history/State";
import WorkedItem from "@pages/history/WorkedItem";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const codes = ["WO010", "WO020", "WO030", "WO040"];

export default function Worked() {
  const { register, handleSubmit } = useForm();
  const [keyword, setKeyword] = useState("");
  const [toggledStates, setToggledStates] = useState([]);
  const { data, refetch } = useOrdersFilter(toggledStates, keyword);

  const onSearchSubmit = formData => {
    setKeyword(formData.keyword);
  };

  useEffect(() => {
    refetch();
  }, [keyword]);

  return (
    <div>
      <HistorySearch
        placeholder="내가 일하는 장소를 검색해보세요."
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
      {data &&
        data.map(order => (
          <WorkedItem key={order._id} data={order} refetch={refetch} />
        ))}
    </div>
  );
}
