import { motion } from "framer-motion";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function Account() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-6 max-w-[100rem] mx-auto pb-12"
    >
      <div className="pb-2 border-b border-zinc-800/80">
        <h1 className="text-[2.6rem] font-bold text-zinc-100 tracking-tight">
          Manager Profile & Security
        </h1>
        <p className="text-[1.3rem] text-zinc-400 mt-0.5">
          Manage your personal executive details, avatar portrait, and password credentials.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <UpdateUserDataForm />
        <UpdatePasswordForm />
      </div>
    </motion.div>
  );
}

export default Account;
