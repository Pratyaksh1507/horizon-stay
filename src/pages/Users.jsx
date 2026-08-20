import { motion } from "framer-motion";
import { ShieldCheck, Mail, Award, CircleDot } from "lucide-react";
import SignupForm from "../features/authentication/SignupForm";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

const STAFF_MEMBERS = [
  {
    id: 1,
    name: "Horizon Manager",
    role: "General Manager",
    email: "demo@horizonstay.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    status: "Active Now",
    statusColor: "emerald",
    department: "Executive Leadership",
  },
  {
    id: 2,
    name: "Sophia Sterling",
    role: "Front Desk Concierge Lead",
    email: "sophia.s@horizonstay.com",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    status: "On Duty",
    statusColor: "emerald",
    department: "Guest Relations",
  },
  {
    id: 3,
    name: "Liam Henderson",
    role: "Executive Housekeeping Director",
    email: "liam.h@horizonstay.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    status: "On Shift",
    statusColor: "sky",
    department: "Resort Readiness",
  },
  {
    id: 4,
    name: "Marcus Chen",
    role: "Resort Operations & Facilities",
    email: "marcus.c@horizonstay.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    status: "Active",
    statusColor: "amber",
    department: "Logistics & Maintenance",
  },
];

function Users() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="flex flex-col gap-6 max-w-[120rem] mx-auto pb-12"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[2.6rem] font-bold text-zinc-100 tracking-tight">
              Staff & User Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[1.15rem] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
              {STAFF_MEMBERS.length} Active Staff
            </span>
          </div>
          <p className="text-[1.3rem] text-zinc-400 mt-0.5">
            Manage resort staff accounts, role-based security access, and personnel invitations.
          </p>
        </div>
      </div>

      {/* Staff Roster Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STAFF_MEMBERS.map((staff) => (
          <div
            key={staff.id}
            className="p-5 rounded-2xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 hover:border-zinc-700/80 transition-all flex flex-col justify-between gap-4 group shadow-lg"
          >
            <div className="flex items-start justify-between gap-3">
              <img
                src={staff.avatar}
                alt={staff.name}
                className="w-14 h-14 rounded-xl object-cover border border-zinc-700 shadow-sm"
              />
              <span
                className={`px-2 py-0.5 rounded-full text-[1.05rem] font-semibold flex items-center gap-1 border ${
                  staff.statusColor === "emerald"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : staff.statusColor === "sky"
                    ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                }`}
              >
                <CircleDot className="w-3 h-3" />
                {staff.status}
              </span>
            </div>

            <div>
              <h4 className="text-[1.5rem] font-bold text-zinc-100 group-hover:text-amber-300 transition-colors">
                {staff.name}
              </h4>
              <p className="text-[1.2rem] text-amber-400/90 font-medium mt-0.5 flex items-center gap-1">
                <Award className="w-3.5 h-3.5" />
                {staff.role}
              </p>
              <p className="text-[1.15rem] text-zinc-400 mt-2 flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-zinc-500 flex-shrink-0" />
                {staff.email}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-800/60 text-[1.1rem] text-zinc-400 flex items-center justify-between">
              <span>{staff.department}</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Invitation Form */}
      <div className="mt-2">
        <SignupForm />
      </div>
    </motion.div>
  );
}

export default Users;
