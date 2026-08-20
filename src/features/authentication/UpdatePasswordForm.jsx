import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Lock, ShieldCheck } from "lucide-react";
import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;
  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser(
      { password },
      {
        onSuccess: () => {
          reset();
          toast.success("Security credentials updated successfully");
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-5"
    >
      <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
        <Lock className="w-5 h-5 text-amber-400" />
        <div>
          <h3 className="text-[1.8rem] font-bold text-zinc-100">Security & Credentials</h3>
          <p className="text-[1.2rem] text-zinc-400">Update your account password and security settings.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* New Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-zinc-500" />
            New Password (min 8 chars) *
          </label>
          <input
            type="password"
            id="password"
            autoComplete="new-password"
            disabled={isUpdating}
            placeholder="••••••••"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors?.password && (
            <span className="text-[1.15rem] text-red-400">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" />
            Confirm New Password *
          </label>
          <input
            type="password"
            autoComplete="new-password"
            id="passwordConfirm"
            disabled={isUpdating}
            placeholder="••••••••"
            {...register("passwordConfirm", {
              required: "This field is required",
              validate: (value) =>
                getValues().password === value || "Passwords must match",
            })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors?.passwordConfirm && (
            <span className="text-[1.15rem] text-red-400">
              {errors.passwordConfirm.message}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => reset()}
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
          {isUpdating ? "Updating..." : "Update Password"}
        </button>
      </div>
    </form>
  );
}

export default UpdatePasswordForm;
