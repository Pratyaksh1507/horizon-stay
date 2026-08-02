import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();

  const avatarSrc =
    user?.user_metadata?.avatar || user?.user_metadata?.avatarUrl || "/default-user.jpg";
  const fullName =
    user?.user_metadata?.fullName || user?.email?.split("@")[0] || "Account";

  return (
    <div className="flex gap-3 items-center font-medium text-[1.35rem] text-zinc-400">
      <img
        src={avatarSrc}
        alt={fullName}
        className="block w-9 h-9 object-cover object-center rounded-full outline-2 outline-zinc-700"
      />
      <span className="whitespace-nowrap">{fullName}</span>
    </div>
  );
}

export default UserAvatar;
