import useUserStore from "@zustand/userStore";

export default function Payment() {
  const { user } = useUserStore();
  console.log(user);
  return <div>Payment</div>;
}
