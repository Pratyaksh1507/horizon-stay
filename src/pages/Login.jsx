import { motion } from "framer-motion";
import LoginForm from "../features/authentication/LoginForm";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const cardVariants = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const fadeInUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function Login() {
  return (
    <motion.main
      className="min-h-screen grid place-items-center p-6 bg-zinc-950 relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Ambient glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[60%] bg-[radial-gradient(circle,rgba(59,130,246,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[50%] bg-[radial-gradient(circle,rgba(139,92,246,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <motion.section
        className="relative z-10 w-full max-w-[42rem] bg-zinc-900/80 border border-zinc-800 rounded-2xl p-10 flex flex-col gap-7 shadow-2xl shadow-black/40 backdrop-blur-sm"
        variants={cardVariants}
      >
        <motion.div
          className="flex flex-col items-center gap-4"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.img
            src="/horizon-stay-logo.png"
            alt="Horizon Stay"
            className="w-16 h-16 object-contain rounded-xl"
            variants={fadeInUp}
          />
          <motion.h1
            className="text-[1.8rem] font-bold tracking-[0.06em] text-zinc-100"
            variants={fadeInUp}
          >
            HORIZON STAY
          </motion.h1>
        </motion.div>

        <motion.div
          className="text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            className="text-[2rem] font-semibold text-zinc-100"
            variants={fadeInUp}
          >
            Welcome back
          </motion.h2>
          <motion.p
            className="text-[1.4rem] text-zinc-500 mt-1"
            variants={fadeInUp}
          >
            Sign in to manage your hotel dashboard
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-4 flex flex-col gap-2"
          variants={fadeInUp}
          initial="initial"
          animate="animate"
        >
          <div className="flex justify-between items-center text-[1.2rem]">
            <span className="text-zinc-500 uppercase tracking-[0.1em] font-semibold">
              Email
            </span>
            <code className="text-brand-400 font-medium text-[1.2rem]">
              demo@horizonstay.com
            </code>
          </div>
          <div className="flex justify-between items-center text-[1.2rem]">
            <span className="text-zinc-500 uppercase tracking-[0.1em] font-semibold">
              Password
            </span>
            <code className="text-brand-400 font-medium text-[1.2rem]">
              demo1234
            </code>
          </div>
        </motion.div>

        <LoginForm />
      </motion.section>
    </motion.main>
  );
}

export default Login;
