import InputField from "@components/InputField";
import { useGetProducts, useProductsFilter } from "@hooks/useGetProducts";
import EmployedItem from "@pages/history/EmployedItem";
import State from "@pages/history/State";
import useUserStore from "@zustand/userStore";
import { useState } from "react";

const codes = ["EM010", "EM020", "EM030", "EM040"];

export default function Employed() {
  const { user } = useUserStore();
  const [toggledStates, setToggledStates] = useState([]);

  const { data, refetch } = useProductsFilter(user._id, toggledStates);
  return (
    <div>
      <InputField
        placeholder="나 대신 일하는 사람을 검색해보세요."
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
      {/* {data && data.map(post => <EmployedItem key={post._id} data={post} />)} */}
    </div>
  );
}
