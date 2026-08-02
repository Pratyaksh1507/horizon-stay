import { motion } from "framer-motion";
import SignupForm from "../features/authentication/SignupForm";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function NewUsers() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-[2.2rem] font-bold text-zinc-100 tracking-tight mb-2">
        Create a new user
      </h1>
      <SignupForm />
    </motion.div>
  );
}

export default NewUsers;
