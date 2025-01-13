import InputField from "@components/InputField";
import { useGetOrders } from "@hooks/useGetOrders";
import State from "@pages/history/State";
import WorkedItem from "@pages/history/WorkedItem";
import { useState } from "react";

const codes = ["WO010", "WO020", "WO030", "WO040"];

export default function Worked() {
  const { data, refetch } = useGetOrders();

  const [toggledStates, setToggledStates] = useState([]);

  return (
    <div>
      <InputField
        placeholder="내가 일하는 장소를 검색해보세요."
        isLast={true}
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
