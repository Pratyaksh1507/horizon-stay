import { useUser } from "./useUser";

function UserAvatar() {
  const { user } = useUser();

  const avatarSrc =
    user?.user_metadata?.avatar ||
    user?.user_metadata?.avatarUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
  const fullName =
    user?.user_metadata?.fullName || user?.email?.split("@")[0] || "Horizon Manager";

  return (
    <div className="flex gap-3 items-center font-medium text-[1.35rem] text-zinc-300">
      <img
        src={avatarSrc}
        alt={fullName}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
        }}
        className="block w-9 h-9 object-cover object-center rounded-full border border-amber-500/40 shadow-xs flex-shrink-0"
      />
      <div className="flex flex-col min-w-0">
        <span className="font-semibold text-zinc-200 text-[1.35rem] leading-tight truncate">
          {fullName}
        </span>
        <span className="text-[1.1rem] text-amber-400/90 font-medium tracking-wide">
          General Manager
        </span>
      </div>
    </div>
  );
}

export default UserAvatar;
