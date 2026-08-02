import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useLogin } from "./useLogin";

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function LoginForm() {
  const { login, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-5"
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div className="flex flex-col gap-2" variants={fadeInUp}>
        <label
          htmlFor="email"
          className="text-[1.15rem] font-semibold uppercase tracking-[0.08em] text-zinc-500"
        >
          Email address
        </label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          autoComplete="username"
          disabled={isPending}
          {...register("email", { required: "Email is required" })}
          className="w-full px-4 py-3 text-[1.45rem] font-medium text-zinc-100 bg-zinc-800 border border-zinc-700 rounded-xl outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50"
        />
        {errors?.email && (
          <span className="text-[1.2rem] text-red-400">
            {errors.email.message}
          </span>
        )}
      </motion.div>

      <motion.div className="flex flex-col gap-2" variants={fadeInUp}>
        <label
          htmlFor="password"
          className="text-[1.15rem] font-semibold uppercase tracking-[0.08em] text-zinc-500"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          autoComplete="current-password"
          disabled={isPending}
          {...register("password", { required: "Password is required" })}
          className="w-full px-4 py-3 text-[1.45rem] font-medium text-zinc-100 bg-zinc-800 border border-zinc-700 rounded-xl outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:opacity-50"
        />
        {errors?.password && (
          <span className="text-[1.2rem] text-red-400">
            {errors.password.message}
          </span>
        )}
      </motion.div>

      <motion.button
        type="submit"
        disabled={isPending}
        className="w-full py-3.5 text-[1.45rem] font-semibold text-white bg-brand-600 rounded-xl cursor-pointer transition-all duration-200 hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-600/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        variants={fadeInUp}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        {isPending ? "Signing in\u2026" : "Sign In"}
      </motion.button>
    </motion.form>
  );
}

export default LoginForm;
