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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "demo@horizonstay.com",
      password: "demo1234",
    },
  });

  function onSubmit({ email, password }) {
    login({ email, password });
  }

  function handleFillDemo() {
    setValue("email", "demo@horizonstay.com");
    setValue("password", "demo1234");
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
          className="w-full px-4 py-3 text-[1.45rem] font-medium text-zinc-100 bg-zinc-800 border border-zinc-700 rounded-xl outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50"
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
          className="w-full px-4 py-3 text-[1.45rem] font-medium text-zinc-100 bg-zinc-800 border border-zinc-700 rounded-xl outline-none transition-all duration-200 placeholder:text-zinc-600 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-50"
        />
        {errors?.password && (
          <span className="text-[1.2rem] text-red-400">
            {errors.password.message}
          </span>
        )}
      </motion.div>

      <div className="flex flex-col gap-3 mt-1">
        <motion.button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 text-[1.45rem] font-semibold text-zinc-950 bg-gradient-to-r from-amber-400 to-amber-500 rounded-xl cursor-pointer transition-all duration-200 hover:from-amber-300 hover:to-amber-400 hover:shadow-lg hover:shadow-amber-500/25 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          variants={fadeInUp}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          {isPending ? "Signing in\u2026" : "Sign In to Horizon"}
        </motion.button>

        <button
          type="button"
          onClick={handleFillDemo}
          className="text-[1.25rem] text-zinc-400 hover:text-amber-300 transition-colors py-1 text-center"
        >
          Auto-fill Demo Credentials (demo@horizonstay.com)
        </button>
      </div>
    </motion.form>
  );
}

export default LoginForm;
