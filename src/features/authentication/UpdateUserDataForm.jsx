import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Mail, User } from "lucide-react";
import { useUser } from "./useUser";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const { user } = useUser();
  const { updateUser, isUpdating } = useUpdateUser();

  const email = user?.email ?? "";
  const currentFullName = user?.user_metadata?.fullName ?? "";
  const currentAvatar = user?.user_metadata?.avatar ?? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(currentAvatar);

  useEffect(() => {
    setFullName(currentFullName);
  }, [currentFullName]);

  useEffect(() => {
    if (currentAvatar) {
      setAvatarPreview(currentAvatar);
    }
  }, [currentAvatar]);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          toast.success("Profile information successfully updated");
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-5"
    >
      <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
        <User className="w-5 h-5 text-amber-400" />
        <div>
          <h3 className="text-[1.8rem] font-bold text-zinc-100">Personal Information</h3>
          <p className="text-[1.2rem] text-zinc-400">Update your name, staff role, and profile portrait.</p>
        </div>
      </div>

      {/* Avatar Preview & Upload */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-950/60 border border-zinc-800">
        <img
          src={avatarPreview}
          alt={fullName}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
          }}
          className="w-16 h-16 rounded-full object-cover border-2 border-amber-500/40 shadow-sm flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
            Profile Portrait Photo
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            disabled={isUpdating}
            onChange={handleFileChange}
            className="text-[1.25rem] text-zinc-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border file:border-zinc-700 file:text-[1.2rem] file:font-semibold file:bg-zinc-800 file:text-zinc-200 hover:file:bg-zinc-700 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Email (Read only) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            Email Address
          </label>
          <input
            value={email}
            disabled
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-400 bg-zinc-950/50 border border-zinc-800/80 rounded-xl cursor-not-allowed opacity-75"
          />
        </div>

        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-zinc-500" />
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={isUpdating}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => {
            setFullName(currentFullName);
            setAvatar(null);
            setAvatarPreview(currentAvatar);
          }}
          disabled={isUpdating}
          className="px-5 py-2.5 rounded-xl text-[1.35rem] font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isUpdating}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-[1.35rem] font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isUpdating ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </form>
  );
}

export default UpdateUserDataForm;
