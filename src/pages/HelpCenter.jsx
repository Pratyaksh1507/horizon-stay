import {
  HiOutlineEnvelope,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineBookOpen,
  HiOutlineQuestionMarkCircle,
  HiOutlineArrowTopRightOnSquare,
} from "react-icons/hi2";

const RESOURCES = [
  {
    icon: <HiOutlineBookOpen />,
    color: "#6366f1",
    title: "Documentation",
    desc: "Complete guide to managing bookings, cabins, and guests.",
    href: "https://github.com/Pratyaksh1507/horizon-stay",
  },
  {
    icon: <HiOutlineDocumentText />,
    color: "#10b981",
    title: "API Reference",
    desc: "Supabase API endpoints and database schema reference.",
    href: "https://supabase.com/docs",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    color: "#f59e0b",
    title: "Community",
    desc: "Join the discussion on GitHub — report bugs and request features.",
    href: "https://github.com/Pratyaksh1507/horizon-stay/issues",
  },
  {
    icon: <HiOutlineEnvelope />,
    color: "#06b6d4",
    title: "Contact Support",
    desc: "Reach out via email for direct assistance.",
    href: "mailto:pratyaksh@horizonstay.com",
  },
];

const FAQS = [
  {
    q: "How do I create a new booking?",
    a: 'Navigate to the "New Booking" page from the sidebar. Fill in guest details, select a cabin, and choose your dates.',
  },
  {
    q: "How do I check in a guest?",
    a: "Go to the Dashboard and look at Today's Activity. Click the \"Check in\" button next to arriving guests.",
  },
  {
    q: "Can I edit cabin prices?",
    a: "Yes — go to the Cabins page and click the edit icon on any cabin row to update pricing, capacity, or descriptions.",
  },
  {
    q: "How do I change the hotel settings?",
    a: "Navigate to Settings from the sidebar. You can update breakfast price, min/max nights, and max guests per booking.",
  },
  {
    q: "Is the data real-time?",
    a: "Yes — all data is stored in Supabase and synced in real-time with React Query caching for optimal performance.",
  },
];

function HelpCenter() {
  return (
    <div>
      <h1 className="text-[2.2rem] font-bold text-zinc-100 tracking-tight mb-6">
        Help Center
      </h1>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-5">
        {RESOURCES.map((r) => (
          <a
            key={r.title}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-7 flex flex-col gap-3 no-underline transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/20 hover:border-brand-500/30"
          >
            <div className="flex items-center justify-between">
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${r.color}30, ${r.color}10)`,
                }}
              >
                <span style={{ color: r.color }} className="w-[2.2rem] h-[2.2rem]">
                  {r.icon}
                </span>
              </div>
              <HiOutlineArrowTopRightOnSquare className="w-4 h-4 text-zinc-500" />
            </div>
            <h3 className="text-[1.5rem] font-semibold text-zinc-200">{r.title}</h3>
            <p className="text-[1.35rem] text-zinc-400 leading-relaxed">{r.desc}</p>
          </a>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 mt-6">
        <h2 className="text-[1.8rem] font-semibold text-zinc-100 mb-4">
          <HiOutlineQuestionMarkCircle className="inline align-middle mr-2 w-6 h-6" />
          Frequently Asked Questions
        </h2>
        <hr className="border-none border-t border-zinc-800 my-3" />
        {FAQS.map((faq) => (
          <details
            key={faq.q}
            className="py-4 border-b border-zinc-800 last:border-b-0 group"
          >
            <summary className="text-[1.45rem] font-semibold text-zinc-200 cursor-pointer list-none flex items-center gap-2.5 marker:hidden [&::-webkit-details-marker]:hidden before:content-['+'] before:text-[1.8rem] before:text-brand-500 before:font-bold before:w-5 before:text-center group-open:before:content-['−']">
              {faq.q}
            </summary>
            <p className="mt-2 ml-8 text-[1.35rem] text-zinc-400 leading-relaxed">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default HelpCenter;
