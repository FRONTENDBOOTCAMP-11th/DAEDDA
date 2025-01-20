import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AlarmItem from "@pages/alarm/AlarmItem";
import Button from "@components/Button";
import useAlarmExistStore from "@zustand/alarmExistStore";

export default function Alarm() {
  const axios = useAxiosInstance();
  const { alarmExist, setAlarmExist } = useAlarmExistStore();
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
    <div className="mt-2">
      {alarmExist ? (
        <div className="flex justify-end">
          <div className="fixed mt-2">
            <Button
              className="w-[70px] cursor-pointer"
              color="white"
              height="sm"
              onClick={onCloseClicked}
            >
              모두 읽음
            </Button>
          </div>
        </div>
      ) : (
        <p>존재하는 알람이 없습니다.</p>
      )}

      {notifications?.map((notification, index) => (
        <AlarmItem key={index} notification={notification} />
      ))}
    </div>
  );
}
