import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMutation, useQuery } from "@tanstack/react-query";
import AlarmItem from "@pages/alarm/AlarmItem";
import Button from "@components/Button";

export default function Alarm() {
  const axios = useAxiosInstance();

  const { data: notifications, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => axios.get(`/notifications/`),
    select: res => {
      return res.data.item;
    },
  });

  const removeAlarm = useMutation({
    mutationFn: () => {
      return axios.patch(`notifications/read`);
    },
  });

  const onCloseClicked = () => {
    removeAlarm.mutate();
    refetch();
  };

  return (
    <div className="relative mt-2">
      <div className="absolute top-0 right-0">
        <Button className="w-[60px]" color="white" onClick={onCloseClicked}>
          모두 읽음
        </Button>
      </div>

      {notifications?.map((notification, index) => (
        <AlarmItem key={index} notification={notification} />
      ))}
    </div>
  );
}
