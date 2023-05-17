import { createContext, useContext, useState, ReactNode } from "react";
import { Modal } from "../interface/modal";


type ModalProps = {
  children: ReactNode;
};

type ModalContextValue = {
  modal: Modal;
  setModal: (modal: Modal) => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

const ModalProvider = ({ children }: ModalProps) => {
  const [modal, setModal] = useState<Modal>(null);

  const modalContextValue: ModalContextValue = {
    modal,
    setModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = (): ModalContextValue => {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return modalContext;
};

export { ModalProvider, useModal };