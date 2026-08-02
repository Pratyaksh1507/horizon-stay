import { motion } from "framer-motion";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

function Settings() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <h1 className="text-[2.2rem] font-bold text-zinc-100 tracking-tight mb-2">
        Update hotel settings
      </h1>
      <UpdateSettingsForm />
    </motion.div>
  );
}

export default Settings;
