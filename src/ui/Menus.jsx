import { createContext, useState, useContext } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { motion, AnimatePresence } from "framer-motion";

const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="p-1 rounded-lg hover:bg-zinc-800 transition-colors"
    >
      <HiEllipsisVertical className="w-6 h-6 text-zinc-300" />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);

  if (openId !== id) return null;

  return createPortal(
    <AnimatePresence>
      <motion.ul
        ref={ref}
        className="fixed bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl shadow-black/30 z-50 min-w-[16rem]"
        style={{ right: position.x, top: position.y }}
        initial={{ opacity: 0, scale: 0.95, y: -8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -8 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.ul>
    </AnimatePresence>,
    document.body
  );
}

function Button({ children, icon, onClick }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <button
        onClick={handleClick}
        className="w-full text-left px-6 py-3 text-[1.35rem] flex items-center gap-4 hover:bg-zinc-800 transition-colors"
      >
        {icon}
        <span>{children}</span>
      </button>
    </li>
  );
}

Menus.Menu = ({ children }) => (
  <div className="flex items-center justify-end">{children}</div>
);
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
