import { useGetOrderState } from "@hooks/useGetOrderState";
import PropTypes from "prop-types";
import { useState } from "react";

State.propTypes = {
  code: PropTypes.string.isRequired,
  toggledStates: PropTypes.array.isRequired,
  setToggledStates: PropTypes.func.isRequired,
};

export default function State({ code, toggledStates, setToggledStates }) {
  const { data } = useGetOrderState(code);

  const onStateClicked = () => {
    setToggledStates(prev => {
      let temp = [...prev];
      const found = prev.indexOf(code);
      if (found !== -1) {
        temp.splice(found, 1);
      } else {
        temp.push(code);
      }
      return temp;
    });
  };

  return (
    <>
      {data && (
        <div
          className={
            toggledStates?.includes(data.code)
              ? "ring-2 ring-primary px-4 py-2 rounded-xl cursor-pointer"
              : "ring-1 ring-gray-200  text-gray-400 px-4 py-2 rounded-xl cursor-pointer"
          }
          onClick={onStateClicked}
        >
          {data.value}
        </div>
      )}
    </>
  );
}
