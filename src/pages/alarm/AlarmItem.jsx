import { getTimePassed } from "@/utills/func";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation } from "@tanstack/react-query";

import PropTypes from "prop-types";

AlarmItem.propTypes = {
  notification: PropTypes.object.isRequired,
};

export default function AlarmItem({ notification }) {
  return (
    <>
      <section className="p-4 border-b">
        <div className="flex w-full justify-between">
          <h2 className="font-semibold text-[1.1rem]">
            {notification.extra.title}
          </h2>
        </div>
        <div className="flex-col">
          <div className="flex items-center gap-1">
            <h2 className="text-[1.1rem] py-4">{notification.content}</h2>
          </div>
          <h3 className="text-[0.75rem] text-gray-300">
            {getTimePassed(notification.createdAt)}
          </h3>
        </div>
      </section>
    </>
  );
}
