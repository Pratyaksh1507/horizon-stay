import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Mail, Lock, User, UserPlus, Shield } from "lucide-react";
import { useSignup } from "./useSignup";

function SignupForm() {
  const { signup, isPending } = useSignup();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      role: "Front Desk Concierge",
    },
  });

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSuccess: () => {
          reset();
          toast.success(`Staff account created for ${fullName}`);
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col gap-5"
    >
      <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
        <UserPlus className="w-5 h-5 text-amber-400" />
        <div>
          <h3 className="text-[1.8rem] font-bold text-zinc-100">Invite New Staff Member</h3>
          <p className="text-[1.2rem] text-zinc-400">Add an employee account with personalized credentials.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-zinc-500" />
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="e.g. Jessica Sterling"
            disabled={isPending}
            {...register("fullName", { required: "Full name is required" })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors.fullName && (
            <span className="text-[1.15rem] text-red-400">{errors.fullName.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-zinc-500" />
            Staff Email *
          </label>
          <input
            type="email"
            id="email"
            placeholder="staff@horizonstay.com"
            disabled={isPending}
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors.email && (
            <span className="text-[1.15rem] text-red-400">{errors.email.message}</span>
          )}
        </div>

        {/* Role */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-zinc-500" />
            Assigned Role
          </label>
          <select
            {...register("role")}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors cursor-pointer"
          >
            <option value="Front Desk Concierge">Front Desk Concierge</option>
            <option value="Executive Housekeeping">Executive Housekeeping</option>
            <option value="Resort Operations">Resort Operations & Logistics</option>
            <option value="Assistant General Manager">Assistant General Manager</option>
          </select>
        </div>

        {/* Temporary Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-zinc-500" />
            Password (min 8 chars) *
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            disabled={isPending}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password needs at least 8 characters",
              },
            })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors.password && (
            <span className="text-[1.15rem] text-red-400">{errors.password.message}</span>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label className="text-[1.15rem] font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-zinc-500" />
            Confirm Password *
          </label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="••••••••"
            disabled={isPending}
            {...register("passwordConfirm", {
              required: "Please confirm password",
              validate: (value) =>
                value === getValues("password") || "Passwords must match",
            })}
            className="w-full px-4 py-2.5 text-[1.4rem] text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-amber-500 transition-colors"
          />
          {errors.passwordConfirm && (
            <span className="text-[1.15rem] text-red-400">{errors.passwordConfirm.message}</span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
        <button
          type="button"
          onClick={() => reset()}
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl text-[1.35rem] font-semibold text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 text-[1.35rem] font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer disabled:opacity-50"
        >
          {isPending ? "Inviting Staff..." : "Create Staff Account"}
        </button>
      </div>
    </form>
  );
}

export default SignupForm;
