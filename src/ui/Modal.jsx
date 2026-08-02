import { HiXMark } from "react-icons/hi2";
import { createPortal } from "react-dom";
import { createContext, useContext, useState } from "react";
import { cloneElement } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { motion, AnimatePresence } from "framer-motion";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          ref={ref}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl shadow-black/40 p-8 w-full max-w-[90vw]"
          initial={{ opacity: 0, scale: 0.95, y: "-48%" }}
          animate={{ opacity: 1, scale: 1, y: "-50%" }}
          exit={{ opacity: 0, scale: 0.95, y: "-48%" }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <button
            onClick={close}
            className="absolute top-4 right-5 p-1 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <HiXMark className="w-6 h-6" />
          </button>
          <div>{cloneElement(children, { onCloseModal: close })}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
