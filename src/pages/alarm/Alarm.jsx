import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlarmItem from "@pages/alarm/AlarmItem";
import Button from "@components/Button";
import useAlarmExistStore from "@zustand/alarmExistStore";

export default function Alarm() {
  const axios = useAxiosInstance();
  const { setAlarmExist } = useAlarmExistStore();
  const queryClient = useQueryClient();

  const { data: notifications, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => axios.get(`/notifications/`),
    select: res => {
      return res.data.item.reverse();
    },
  });

  const removeAlarm = useMutation({
    mutationFn: () => {
      return axios.patch(`notifications/read`);
    },
  });

  const onCloseClicked = () => {
    removeAlarm.mutate();
    console.log("Alarm removed");
    refetch();
    setAlarmExist(false);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  };

  return (
    <div className="relative mt-2">
      <div className="absolute top-0 right-0">
        <Button
          className="w-[70px] cursor-pointer"
          color="white"
          height="sm"
          onClick={onCloseClicked}
        >
          모두 읽음
        </Button>
      </div>

      {notifications?.map((notification, index) => (
        <AlarmItem key={index} notification={notification} />
      ))}
    </div>
  );
}
